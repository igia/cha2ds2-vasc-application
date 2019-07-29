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
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { Cha2ds2Vasc } from './';
import { StrokeRisk, Gender } from './cha2ds2-vasc.model';
import { map } from 'rxjs/operators';

type RiskScoreResponseType = HttpResponse<StrokeRisk>;

@Injectable({ providedIn: 'root' })
export class Cha2ds2vascService {
    public resourceUrl = SERVER_API_URL + 'cha2ds2vascapi/api/risk-score';

    scorePercentageMapping = new Map();

    constructor(private http: HttpClient) {
        this.initMapping();
    }

    getRisk(data: Cha2ds2Vasc): Observable<RiskScoreResponseType> {
        return this.http.post<StrokeRisk>(this.resourceUrl, data, { observe: 'response' });
    }

    calculateStrokeRisk(data: Cha2ds2Vasc): StrokeRisk {
        let score = 0;
        for (const key in data) {
            if (data.hasOwnProperty(key) && data[key]) {
                switch (key) {
                    case 'congestiveHeartFailure': {
                        score += 1;
                        break;
                    }
                    case 'hypertension': {
                        score += 1;
                        break;
                    }
                    case 'diabetesMellitus': {
                        score += 1;
                        break;
                    }
                    case 'priorStroke': {
                        score += 2;
                        break;
                    }
                    case 'vascularDisease': {
                        score += 1;
                        break;
                    }
                    case 'sexCategory': {
                        if (data[key] === Gender.Female) {
                            score += 1;
                        }
                        break;
                    }
                    case 'age': {
                        if (data[key] >= 75) {
                            score += 2;
                        } else if (data[key] > 64 && data[key] < 75) {
                            score += 1;
                        }
                        break;
                    }
                    default: {
                        break;
                    }
                }
            }
        }

        return new StrokeRisk(score, this.scorePercentageMapping.get(score));
    }

    /* private methods */
    private initMapping() {
        this.scorePercentageMapping.set(0, 0);
        this.scorePercentageMapping.set(1, 1.3);
        this.scorePercentageMapping.set(2, 2.2);
        this.scorePercentageMapping.set(3, 3.2);
        this.scorePercentageMapping.set(4, 4.0);
        this.scorePercentageMapping.set(5, 6.7);
        this.scorePercentageMapping.set(6, 9.8);
        this.scorePercentageMapping.set(7, 9.6);
        this.scorePercentageMapping.set(8, 6.7);
        this.scorePercentageMapping.set(9, 15.2);
    }
}
