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
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { Cha2Ds2VascappTestModule } from '../../test.module';
import { CalculatorComponent, Cha2ds2vascService, Cha2ds2Vasc, Gender } from 'app/calculator';

describe('Component Tests', () => {
    describe('Calculator Component', () => {
        let comp: CalculatorComponent;
        let fixture: ComponentFixture<CalculatorComponent>;
        let service: Cha2ds2vascService;

        beforeEach(
            async(() => {
                TestBed.configureTestingModule({
                    imports: [Cha2Ds2VascappTestModule],
                    declarations: [CalculatorComponent]
                })
                    .overrideTemplate(CalculatorComponent, '')
                    .compileComponents();
            })
        );

        beforeEach(() => {
            fixture = TestBed.createComponent(CalculatorComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(Cha2ds2vascService);
        });

        it('should calculate Risk score on calculate button using client side', () => {
            // GIVEN
            comp.formData = new Cha2ds2Vasc(true, true, true, true, true, Gender.Female, 78);
            // WHEN
            comp.onSubmit();

            // THEN
            expect(comp.answerData).toEqual({
                totalPoint: 9,
                strokeRiskPercent: 15.2
            });
        });

        it('should calculate Risk score on calculate button using server side', () => {
            // GIVEN
            comp.formData = new Cha2ds2Vasc(true, true, true, true, true, Gender.Female, 78);
            comp.requestServer = true;
            spyOn(service, 'getRisk').and.returnValue(
                of(
                    new HttpResponse({
                        body: {
                            totalPoint: 9,
                            strokeRiskPercent: 15.2
                        }
                    })
                )
            );
            // WHEN
            comp.onSubmit();

            // THEN
            expect(comp.answerData).toEqual({
                totalPoint: 9,
                strokeRiskPercent: 15.2
            });
        });
    });
});
