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
export enum Gender {
    Male = 'Male',
    Female = 'Female'
}

export class Cha2ds2Vasc {
    constructor(
        public congestiveHeartFailure?: boolean,
        public hypertension?: boolean,
        public diabetesMellitus?: boolean,
        public priorStroke?: boolean,
        public vascularDisease?: boolean,
        public sexCategory?: Gender,
        public age?: number
    ) {}
}

export class StrokeRisk {
    constructor(public totalPoint?: number, public strokeRiskPercent?: number) {
        this.totalPoint = this.totalPoint || 0;
        this.strokeRiskPercent = this.strokeRiskPercent || 0;
    }
}
