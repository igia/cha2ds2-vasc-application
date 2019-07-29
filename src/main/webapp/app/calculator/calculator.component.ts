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
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Cha2ds2Vasc, StrokeRisk, Cha2ds2vascService } from './';
import { HttpResponse } from '@angular/common/http';
import * as $ from 'jquery';

@Component({
    selector: 'igia-calculator',
    templateUrl: './calculator.component.html',
    styleUrls: ['calculator.scss']
})
export class CalculatorComponent implements OnInit, AfterViewInit {
    formData: Cha2ds2Vasc;
    requestServer: boolean;
    answerData: StrokeRisk;
    loaded = true;

    constructor(private cha2ds2vascService: Cha2ds2vascService) {
        this.formData = {};
        this.requestServer = false;
        this.answerData = new StrokeRisk();
    }

    ngOnInit() {}

    ngAfterViewInit() {
        $('igia-calculator').bootstrapMaterialDesign({});
    }

    onSubmit() {
        this.loaded = false;
        if (this.requestServer) {
            this.cha2ds2vascService.getRisk(this.formData).subscribe(
                (res: HttpResponse<StrokeRisk>) => {
                    this.loaded = true;
                    this.answerData = res.body;
                },
                (error: any) => {
                    this.loaded = true;
                }
            );
        } else {
            const data = this.cha2ds2vascService.calculateStrokeRisk(this.formData);
            this.answerData = data;
            this.loaded = true;
        }
    }

    clearForm() {
        this.formData = {};
        this.answerData = new StrokeRisk();
    }
}
