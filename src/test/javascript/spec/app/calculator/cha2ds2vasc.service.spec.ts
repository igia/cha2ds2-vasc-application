/*
 * This Source Code Form is subject to the terms of the Mozilla Public License, v.
 * 2.0 with a Healthcare Disclaimer.
 * A copy of the Mozilla Public License, v. 2.0 with the Healthcare Disclaimer can
 * be found under the top level directory, named LICENSE.
 * If a copy of the MPL was not distributed with this file, You can obtain one at
 * http://mozilla.org/MPL/2.0/.
 * If a copy of the Healthcare Disclaimer was not distributed with this file, You
 * can obtain one at the project website https://github.com/igia.
 *
 * Copyright (C) 2018-2019 Persistent Systems, Inc.
 */
import { TestBed, async } from '@angular/core/testing';
import { HttpEventType, HttpEvent } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Cha2ds2vascService, Cha2ds2Vasc, Gender, StrokeRisk } from 'app/calculator';

describe('Service Tests', () => {
    describe('Cha2ds2vasc Service', () => {
        let service: Cha2ds2vascService;
        let backend: HttpTestingController;
        const strokeRisk: StrokeRisk = {
            strokeRiskPercent: 15.2,
            totalPoint: 9
        };

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule],
                providers: [Cha2ds2vascService]
            });

            service = TestBed.get(Cha2ds2vascService);
            backend = TestBed.get(HttpTestingController);
        });
        describe('Service methods', () => {
            it(
                `should return correct risk score from client function`,
                async(() => {
                    const inputData = new Cha2ds2Vasc(true, true, true, true, true, Gender.Female, 78);
                    const response = service.calculateStrokeRisk(inputData);
                    expect(response.totalPoint).toEqual(9);
                    expect(response.strokeRiskPercent).toEqual(15.2);
                })
            );

            it(
                `should return correct risk score from server`,
                async(() => {
                    const inputData = new Cha2ds2Vasc(true, true, true, true, true, Gender.Female, 78);
                    service.getRisk(inputData).subscribe((event: HttpEvent<any>) => {
                        switch (event.type) {
                            case HttpEventType.Response: {
                                const res: StrokeRisk = event.body;
                                expect(res).toEqual(strokeRisk);
                                expect(event.status).toEqual(200);
                                expect(event.statusText).toEqual('OK');
                            }
                        }
                    });

                    const mockRequest = backend.expectOne({ method: 'POST' });
                    expect(mockRequest.cancelled).toBeFalsy();
                    expect(mockRequest.request.responseType).toEqual('json');
                    mockRequest.flush(strokeRisk, {
                        status: 200,
                        statusText: 'OK'
                    });
                })
            );
        });
        afterEach(() => {
            backend.verify();
        });
    });
});
