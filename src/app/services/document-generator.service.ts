import { Injectable } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { NgxSpinnerService } from 'ngx-spinner';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable({
    providedIn: 'root'
})
export class DocumentGeneratorService {

    constructor(private spinner: NgxSpinnerService) { }
    /*
        public generateServiceReport(report: IReport): Promise<IResponse> {
            this.spinner.show();
            return new Promise<IResponse>(resolve => {
                this.spinner.hide();
                const response: IResponse = {
                    code: 200,
                    fields: [],
                    message: "Documento generado con exito",
                    status: ""
                };
                pdfMake.createPdf(this.definition(report)).getDataUrl(doc => {
                    response.fields.document = this.base64ToArrayBuffer(doc.split(',', 2)[1]);
                    resolve(response);
                });
            });
        }
    
        public downloadServiceReport(report: IReport) {
            pdfMake.createPdf(this.definition(report)).download(report.device.model + '-' + report.service.folio + '.pdf');
        }
    
        public printServiceReport(report: IReport) {
            pdfMake.createPdf(this.definition(report)).print();
        }
    
        private base64ToArrayBuffer(base64) {
            let binary_string = window.atob(base64);
            let len = binary_string.length;
            let bytes = new Uint8Array(len);
            for (let i = 0; i < len; i++) {
                bytes[i] = binary_string.charCodeAt(i);
            }
            return bytes.buffer;
        }
    
        private definition(report: IReport): any {
            return {
                content: [
                    {
                        alignment: 'justify',
                        columns: [
                            {
                                image: 'logo',
                                width: 120
                            },
                            {
                                text: 'INFORME DE MANTENIMIENTO',
                                style: 'header'
                            }
                        ]
                    },
                    {
                        columns: [
                            { width: '*', text: '' },
                            {
                                width: 'auto',
                                table: {
                                    body: [
                                        [
                                            {
                                                text: 'Fecha',
                                                style: 'tabheader'
                                            },
                                            {
                                                text: report.service.service_date,
                                                style: 'tabcontent'
                                            }
                                        ],
                                        [
                                            {
                                                text: 'Folio',
                                                style: 'tabheader'
                                            }, {
                                                text: report.service.folio,
                                                style: 'tabcontent'
                                            }
                                        ]
                                    ]
                                }
                            }
                        ]
                    },
                    {
                        style: 'table',
                        table: {
                            widths: [50, '*', 50, '*'],
                            body: [
                                [{
                                    text: 'Cliente',
                                    style: 'tabheader'
                                }, {
                                    text: report.customer.businessName,
                                    style: 'tabcontent'
                                }, {
                                    text: 'Marca',
                                    style: 'tabheader'
                                }, {
                                    text: report.device.brand,
                                    style: 'tabcontent'
                                }],
                                [{
                                    text: 'Contacto',
                                    style: 'tabheader'
                                }, {
                                    text: report.customer.contact,
                                    style: 'tabcontent'
                                }, {
                                    text: 'Modelo',
                                    style: 'tabheader'
                                }, {
                                    text: report.device.model,
                                    style: 'tabcontent'
                                }],
                                [{
                                    text: 'Area',
                                    style: 'tabheader'
                                }, {
                                    text: report.device.placement,
                                    style: 'tabcontent'
                                }, {
                                    text: 'Serie',
                                    style: 'tabheader'
                                }, {
                                    text: report.device.serial,
                                    style: 'tabcontent'
                                }],
                                [{
                                    text: 'Instrumento',
                                    style: 'tabheader'
                                }, {
                                    text: report.device.type,
                                    style: 'tabcontent'
                                }, {
                                    text: 'Identificador',
                                    style: 'tabheader'
                                }, {
                                    text: report.device.identificator,
                                    style: 'tabcontent'
                                }],
                            ]
                        }
                    },
                    {
                        text: 'Pruebas',
                        style: 'subtitle'
                    },
                    {
                        style: 'table',
                        table: {
                            body: [
                                [
                                    {
                                        text: 'Repetibilidad',
                                        style: 'tabheader',
                                        colSpan: 2
                                    },
                                    '',
                                    {
                                        text: 'Antes',
                                        style: 'tabheader',
                                        colSpan: 2
                                    },
                                    '',
                                    {
                                        text: 'Despues',
                                        style: 'tabheader',
                                        colSpan: 2
                                    },
                                    ''
                                ],
                                [
                                    {
                                        text: 'No. De prueba',
                                        style: 'tabheader'
                                    },
                                    {
                                        text: 'Valor de masa',
                                        style: 'tabheader'
                                    },
                                    {
                                        text: 'Lectura inicial',
                                        style: 'tabheader'
                                    },
                                    {
                                        text: 'Indicación',
                                        style: 'tabheader'
                                    },
                                    {
                                        text: 'Lectura inicial',
                                        style: 'tabheader'
                                    },
                                    {
                                        text: 'Indicación',
                                        style: 'tabheader'
                                    }
                                ],
                                [
                                    {
                                        text: report.service.repeatability[0].id,
                                        style: 'tabheader'
                                    },
                                    {
                                        text: report.service.repeatability[0].mass,
                                        style: 'tabcontent'
                                    },
                                    {
                                        text: report.service.repeatability[0].beforeStartRead,
                                        style: 'tabcontent'
                                    },
                                    {
                                        text: report.service.repeatability[0].beforeIndication,
                                        style: 'tabcontent'
                                    },
                                    {
                                        text: report.service.repeatability[0].afterStartRead,
                                        style: 'tabcontent'
                                    },
                                    {
                                        text: report.service.repeatability[0].afterIndication,
                                        style: 'tabcontent'
                                    }
                                ],
                                [
                                    {
                                        text: report.service.repeatability[1].id,
                                        style: 'tabheader'
                                    },
                                    {
                                        text: report.service.repeatability[1].mass,
                                        style: 'tabcontent'
                                    },
                                    {
                                        text: report.service.repeatability[1].beforeStartRead,
                                        style: 'tabcontent'
                                    },
                                    {
                                        text: report.service.repeatability[1].beforeIndication,
                                        style: 'tabcontent'
                                    },
                                    {
                                        text: report.service.repeatability[1].afterStartRead,
                                        style: 'tabcontent'
                                    },
                                    {
                                        text: report.service.repeatability[1].afterIndication,
                                        style: 'tabcontent'
                                    }
                                ],
                                [
                                    {
                                        text: report.service.repeatability[2].id,
                                        style: 'tabheader'
                                    },
                                    {
                                        text: report.service.repeatability[2].mass,
                                        style: 'tabcontent'
                                    },
                                    {
                                        text: report.service.repeatability[2].beforeStartRead,
                                        style: 'tabcontent'
                                    },
                                    {
                                        text: report.service.repeatability[2].beforeIndication,
                                        style: 'tabcontent'
                                    },
                                    {
                                        text: report.service.repeatability[2].afterStartRead,
                                        style: 'tabcontent'
                                    },
                                    {
                                        text: report.service.repeatability[2].afterIndication,
                                        style: 'tabcontent'
                                    }
                                ]
                            ]
                        }
    
                    },
                    {
                        columns: [
                            {
                                style: 'table',
                                table: {
                                    body: [
                                        [
                                            {
                                                text: 'Excentricidad',
                                                style: 'tabheader'
                                            },
                                            {
                                                text: 'Carga de prueba mayor al 30 % del alcance maximo de medición',
                                                style: 'tabheader',
                                                colSpan: 2
                                            },
                                            ''
                                        ],
                                        [
                                            {
                                                text: 'Prueba',
                                                style: 'tabheader'
                                            },
                                            {
                                                text: 'Lectura inicial',
                                                style: 'tabheader'
                                            },
                                            {
                                                text: 'Indicación',
                                                style: 'tabheader'
                                            }
                                        ],
                                        [
                                            {
                                                text: 'centro',
                                                style: 'tabheader'
                                            },
                                            {
                                                text: report.service.excentricity[0].startRead,
                                                style: 'tabcontent'
                                            },
                                            {
                                                text: report.service.excentricity[0].indication,
                                                style: 'tabcontent'
                                            }
                                        ],
                                        [
                                            {
                                                text: report.service.excentricity[1].test,
                                                style: 'tabheader'
                                            },
                                            {
                                                text: report.service.excentricity[1].startRead,
                                                style: 'tabcontent'
                                            },
                                            {
                                                text: report.service.excentricity[1].indication,
                                                style: 'tabcontent'
                                            }
                                        ],
                                        [
                                            {
                                                text: report.service.excentricity[2].test,
                                                style: 'tabheader'
                                            },
                                            {
                                                text: report.service.excentricity[2].startRead,
                                                style: 'tabcontent'
                                            },
                                            {
                                                text: report.service.excentricity[2].indication,
                                                style: 'tabcontent'
                                            }
                                        ],
                                        [
                                            {
                                                text: report.service.excentricity[3].test,
                                                style: 'tabheader'
                                            },
                                            {
                                                text: report.service.excentricity[3].startRead,
                                                style: 'tabcontent'
                                            },
                                            {
                                                text: report.service.excentricity[3].indication,
                                                style: 'tabcontent'
                                            }
                                        ],
                                        [
                                            {
                                                text: report.service.excentricity[4].test,
                                                style: 'tabheader'
                                            },
                                            {
                                                text: report.service.excentricity[4].startRead,
                                                style: 'tabcontent'
                                            },
                                            {
                                                text: report.service.excentricity[4].indication,
                                                style: 'tabcontent'
                                            }
                                        ],
                                    ]
                                }
    
                            },
                            {
    
                                image: 'positions',
                                width: 100
                            }
                        ]
                    },
                    {
                        style: 'table',
                        table: {
                            body: [
                                [
                                    {
                                        text: 'Exactitud',
                                        style: 'tabheader',
                                        colSpan: 4
                                    }, '', '', ''
    
                                ],
                                [
                                    {
                                        text: 'No. De prueba',
                                        style: 'tabheader'
                                    },
                                    {
                                        text: 'Masa nominal',
                                        style: 'tabheader'
                                    },
                                    {
                                        text: 'Lectura inicial',
                                        style: 'tabheader'
                                    },
                                    {
                                        text: 'Indicación',
                                        style: 'tabheader'
                                    }
                                ],
                                [
                                    {
                                        text: report.service.accuracy[0].test,
                                        style: 'tabheader'
                                    },
                                    {
                                        text: report.service.accuracy[0].mass,
                                        style: 'tabcontent'
                                    },
                                    {
                                        text: report.service.accuracy[0].startRead,
                                        style: 'tabcontent'
                                    },
                                    {
                                        text: report.service.accuracy[0].indication,
                                        style: 'tabcontent'
                                    }
                                ],
                                [
                                    {
                                        text: report.service.accuracy[1].test,
                                        style: 'tabheader'
                                    },
                                    {
                                        text: report.service.accuracy[1].mass,
                                        style: 'tabcontent'
                                    },
                                    {
                                        text: report.service.accuracy[1].startRead,
                                        style: 'tabcontent'
                                    },
                                    {
                                        text: report.service.accuracy[1].indication,
                                        style: 'tabcontent'
                                    }
                                ], [
                                    {
                                        text: report.service.accuracy[2].test,
                                        style: 'tabheader'
                                    },
                                    {
                                        text: report.service.accuracy[2].mass,
                                        style: 'tabcontent'
                                    },
                                    {
                                        text: report.service.accuracy[2].startRead,
                                        style: 'tabcontent'
                                    },
                                    {
                                        text: report.service.accuracy[2].indication,
                                        style: 'tabcontent'
                                    }
                                ], [
                                    {
                                        text: report.service.accuracy[3].test,
                                        style: 'tabheader'
                                    },
                                    {
                                        text: report.service.accuracy[3].mass,
                                        style: 'tabcontent'
                                    },
                                    {
                                        text: report.service.accuracy[3].startRead,
                                        style: 'tabcontent'
                                    },
                                    {
                                        text: report.service.accuracy[3].indication,
                                        style: 'tabcontent'
                                    }
                                ], [
                                    {
                                        text: report.service.accuracy[4].test,
                                        style: 'tabheader'
                                    },
                                    {
                                        text: report.service.accuracy[4].mass,
                                        style: 'tabcontent'
                                    },
                                    {
                                        text: report.service.accuracy[4].startRead,
                                        style: 'tabcontent'
                                    },
                                    {
                                        text: report.service.accuracy[4].indication,
                                        style: 'tabcontent'
                                    }
                                ]
                            ]
                        }
    
                    },
                    {
                        text: 'Acciones realizadas',
                        style: 'subtitle'
                    },
                    {
                        style: 'table',
                        table: {
                            widths: [70, 50, '*', 50],
                            body: [
                                [
                                    {
                                        text: 'Inspección',
                                        style: 'tabheader'
                                    },
                                    {
                                        text: 'Estado',
                                        style: 'tabheader'
                                    },
                                    {
                                        text: 'Defecto',
                                        style: 'tabheader'
                                    },
                                    {
                                        text: 'N/A',
                                        style: 'tabheader'
                                    },
    
                                ],
                                [
                                    {
                                        text: report.service.inspection[0].description,
                                        style: 'tabheader'
                                    },
                                    {
                                        text: report.service.inspection[0].status,
                                        style: 'tabcontent'
                                    },
                                    {
                                        text: report.service.inspection[0].defect,
                                        style: 'tabcontent'
                                    },
                                    {
                                        text: report.service.inspection[0].na ? 'No aplica' : '',
                                        style: 'tabcontent'
                                    }
                                ],
                                [
                                    {
                                        text: report.service.inspection[1].description,
                                        style: 'tabheader'
                                    },
                                    {
                                        text: report.service.inspection[1].status,
                                        style: 'tabcontent'
                                    },
                                    {
                                        text: report.service.inspection[1].defect,
                                        style: 'tabcontent'
                                    },
                                    {
                                        text: report.service.inspection[1].na ? 'No aplica' : '',
                                        style: 'tabcontent'
                                    }
                                ], [
                                    {
                                        text: report.service.inspection[2].description,
                                        style: 'tabheader'
                                    },
                                    {
                                        text: report.service.inspection[2].status,
                                        style: 'tabcontent'
                                    },
                                    {
                                        text: report.service.inspection[2].defect,
                                        style: 'tabcontent'
                                    },
                                    {
                                        text: report.service.inspection[2].na ? 'No aplica' : '',
                                        style: 'tabcontent'
                                    }
                                ], [
                                    {
                                        text: report.service.inspection[3].description,
                                        style: 'tabheader'
                                    },
                                    {
                                        text: report.service.inspection[3].status,
                                        style: 'tabcontent'
                                    },
                                    {
                                        text: report.service.inspection[3].defect,
                                        style: 'tabcontent'
                                    },
                                    {
                                        text: report.service.inspection[3].na ? 'No aplica' : '',
                                        style: 'tabcontent'
                                    }
                                ], [
                                    {
                                        text: report.service.inspection[4].description,
                                        style: 'tabheader'
                                    },
                                    {
                                        text: report.service.inspection[4].status,
                                        style: 'tabcontent'
                                    },
                                    {
                                        text: report.service.inspection[4].defect,
                                        style: 'tabcontent'
                                    },
                                    {
                                        text: report.service.inspection[4].na ? 'No aplica' : '',
                                        style: 'tabcontent'
                                    }
                                ], [
                                    {
                                        text: report.service.inspection[5].description,
                                        style: 'tabheader'
                                    },
                                    {
                                        text: report.service.inspection[5].status,
                                        style: 'tabcontent'
                                    },
                                    {
                                        text: report.service.inspection[5].defect,
                                        style: 'tabcontent'
                                    },
                                    {
                                        text: report.service.inspection[5].na ? 'No aplica' : '',
                                        style: 'tabcontent'
                                    }
                                ], [
                                    {
                                        text: report.service.inspection[6].description,
                                        style: 'tabheader'
                                    },
                                    {
                                        text: report.service.inspection[6].status,
                                        style: 'tabcontent'
                                    },
                                    {
                                        text: report.service.inspection[6].defect,
                                        style: 'tabcontent'
                                    },
                                    {
                                        text: report.service.inspection[6].na ? 'No aplica' : '',
                                        style: 'tabcontent'
                                    }
                                ], [
                                    {
                                        text: report.service.inspection[7].description,
                                        style: 'tabheader'
                                    },
                                    {
                                        text: report.service.inspection[7].status,
                                        style: 'tabcontent'
                                    },
                                    {
                                        text: report.service.inspection[7].defect,
                                        style: 'tabcontent'
                                    },
                                    {
                                        text: report.service.inspection[7].na ? 'No aplica' : '',
                                        style: 'tabcontent'
                                    }
                                ], [
                                    {
                                        text: report.service.inspection[8].description,
                                        style: 'tabheader'
                                    },
                                    {
                                        text: report.service.inspection[8].status,
                                        style: 'tabcontent'
                                    },
                                    {
                                        text: report.service.inspection[8].defect,
                                        style: 'tabcontent'
                                    },
                                    {
                                        text: report.service.inspection[8].na ? 'No aplica' : '',
                                        style: 'tabcontent'
                                    }
                                ], [
                                    {
                                        text: report.service.inspection[9].description,
                                        style: 'tabheader'
                                    },
                                    {
                                        text: report.service.inspection[9].status,
                                        style: 'tabcontent'
                                    },
                                    {
                                        text: report.service.inspection[9].defect,
                                        style: 'tabcontent'
                                    },
                                    {
                                        text: report.service.inspection[9].na ? 'No aplica' : '',
                                        style: 'tabcontent'
                                    }
                                ], [
                                    {
                                        text: report.service.inspection[10].description,
                                        style: 'tabheader'
                                    },
                                    {
                                        text: report.service.inspection[10].status,
                                        style: 'tabcontent'
                                    },
                                    {
                                        text: report.service.inspection[10].defect,
                                        style: 'tabcontent'
                                    },
                                    {
                                        text: report.service.inspection[10].na ? 'No aplica' : '',
                                        style: 'tabcontent'
                                    }
                                ],
                            ]
                        }
    
                    },
                    {
                        style: 'table',
                        table: {
                            widths: [70, 50, '*'],
                            body: [
                                [
                                    {
                                        text: 'Ajustes',
                                        style: 'tabheader'
                                    },
                                    {
                                        text: 'Realizado',
                                        style: 'tabheader'
                                    },
                                    {
                                        text: 'Valor de referencia',
                                        style: 'tabheader'
                                    },
    
                                ],
                                [
                                    {
                                        text: report.service.adjustment[0].description,
                                        style: 'tabheader'
                                    },
                                    {
                                        text: report.service.adjustment[0].value ? 'No Realizado' : 'Realizado',
                                        style: 'tabcontent'
                                    },
                                    {
                                        text: report.service.adjustment[0].reference,
                                        style: 'tabcontent'
                                    }
                                ],
                                [
                                    {
                                        text: report.service.adjustment[1].description,
                                        style: 'tabheader'
                                    },
                                    {
                                        text: report.service.adjustment[1].value ? 'No Realizado' : 'Realizado',
                                        style: 'tabcontent'
                                    },
                                    {
                                        text: report.service.adjustment[1].reference,
                                        style: 'tabcontent'
                                    }
                                ],
                                [
                                    {
                                        text: report.service.adjustment[2].description,
                                        style: 'tabheader'
                                    },
                                    {
                                        text: report.service.adjustment[2].value ? 'No Realizado' : 'Realizado',
                                        style: 'tabcontent'
                                    },
                                    {
                                        text: report.service.adjustment[2].reference,
                                        style: 'tabcontent'
                                    }
                                ],
                                [
                                    {
                                        text: report.service.adjustment[3].description,
                                        style: 'tabheader'
                                    },
                                    {
                                        text: report.service.adjustment[3].value ? 'No Realizado' : 'Realizado',
                                        style: 'tabcontent'
                                    },
                                    {
                                        text: report.service.adjustment[3].reference,
                                        style: 'tabcontent'
                                    }
                                ],
                                [
                                    {
                                        text: report.service.adjustment[4].description,
                                        style: 'tabheader'
                                    },
                                    {
                                        text: report.service.adjustment[4].value ? 'No Realizado' : 'Realizado',
                                        style: 'tabcontent'
                                    },
                                    {
                                        text: report.service.adjustment[4].reference,
                                        style: 'tabcontent'
                                    }
                                ],
                                [
                                    {
                                        text: report.service.adjustment[5].description,
                                        style: 'tabheader'
                                    },
                                    {
                                        text: report.service.adjustment[5].value ? 'No Realizado' : 'Realizado',
                                        style: 'tabcontent'
                                    },
                                    {
                                        text: report.service.adjustment[5].reference,
                                        style: 'tabcontent'
                                    }
                                ],
                                [
                                    {
                                        text: report.service.adjustment[6].description,
                                        style: 'tabheader'
                                    },
                                    {
                                        text: report.service.adjustment[6].value ? 'No Realizado' : 'Realizado',
                                        style: 'tabcontent'
                                    },
                                    {
                                        text: report.service.adjustment[6].reference,
                                        style: 'tabcontent'
                                    }
                                ],
                                [
                                    {
                                        text: report.service.adjustment[7].description,
                                        style: 'tabheader'
                                    },
                                    {
                                        text: report.service.adjustment[7].value ? 'No Realizado' : 'Realizado',
                                        style: 'tabcontent'
                                    },
                                    {
                                        text: report.service.adjustment[7].reference,
                                        style: 'tabcontent'
                                    }
                                ],
                                [
                                    {
                                        text: report.service.adjustment[8].description,
                                        style: 'tabheader'
                                    },
                                    {
                                        text: report.service.adjustment[8].value ? 'No Realizado' : 'Realizado',
                                        style: 'tabcontent'
                                    },
                                    {
                                        text: report.service.adjustment[8].reference,
                                        style: 'tabcontent'
                                    }
                                ],
                            ]
                        }
    
                    },
                    {
                        style: 'table',
                        table: {
                            widths: [70, 50, '*'],
                            body: [
                                [
                                    {
                                        text: 'Aspecto',
                                        style: 'tabheader'
                                    },
                                    {
                                        text: 'Realizado',
                                        style: 'tabheader'
                                    },
                                    {
                                        text: 'Observaciones',
                                        style: 'tabheader'
                                    },
    
                                ],
                                [
                                    {
                                        text: report.service.appearance[0].description,
                                        style: 'tabheader'
                                    },
                                    {
                                        text: report.service.appearance[0].value,
                                        style: 'tabcontent'
                                    },
                                    {
                                        text: report.service.appearance[0].observations,
                                        style: 'tabcontent'
                                    }
                                ],
                                [
                                    {
                                        text: report.service.appearance[1].description,
                                        style: 'tabheader'
                                    },
                                    {
                                        text: report.service.appearance[1].value,
                                        style: 'tabcontent'
                                    },
                                    {
                                        text: report.service.appearance[1].observations,
                                        style: 'tabcontent'
                                    }
                                ],
                                [
                                    {
                                        text: report.service.appearance[2].description,
                                        style: 'tabheader'
                                    },
                                    {
                                        text: report.service.appearance[2].value,
                                        style: 'tabcontent'
                                    },
                                    {
                                        text: report.service.appearance[2].observations,
                                        style: 'tabcontent'
                                    }
                                ],
                                [
                                    {
                                        text: report.service.appearance[3].description,
                                        style: 'tabheader'
                                    },
                                    {
                                        text: report.service.appearance[3].value,
                                        style: 'tabcontent'
                                    },
                                    {
                                        text: report.service.appearance[3].observations,
                                        style: 'tabcontent'
                                    }
                                ],
                                [
                                    {
                                        text: report.service.appearance[4].description,
                                        style: 'tabheader'
                                    },
                                    {
                                        text: report.service.appearance[4].value,
                                        style: 'tabcontent'
                                    },
                                    {
                                        text: report.service.appearance[4].observations,
                                        style: 'tabcontent'
                                    }
                                ],
                                [
                                    {
                                        text: report.service.appearance[5].description,
                                        style: 'tabheader'
                                    },
                                    {
                                        text: report.service.appearance[5].value,
                                        style: 'tabcontent'
                                    },
                                    {
                                        text: report.service.appearance[5].observations,
                                        style: 'tabcontent'
                                    }
                                ],
                                [
                                    {
                                        text: report.service.appearance[6].description,
                                        style: 'tabheader'
                                    },
                                    {
                                        text: report.service.appearance[6].value,
                                        style: 'tabcontent'
                                    },
                                    {
                                        text: report.service.appearance[6].observations,
                                        style: 'tabcontent'
                                    }
                                ]
                            ]
                        }
    
                    },
                ],
                styles: {
                    header: {
                        fontSize: 16,
                        bold: true,
                        alignment: 'right',
                        margin: [0, 10, 0, 20]
                    },
                    subtitle: {
                        fontSize: 10,
                        bold: true,
                        alignment: 'center'
                    },
                    tabheader: {
                        fontSize: 8,
                        bold: true
                    },
                    tabcontent: {
                        fontSize: 8
                    },
                    table: {
                        margin: [0, 5, 0, 5]
                    }
                },
                images: {
                    logo: 'data:image/png;base64,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',
                    positions: 'data:image/png;base64,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'
                }
    
            };
        }*/
}
