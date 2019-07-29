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
import { NgModule } from '@angular/core';

import { Cha2Ds2VascappSharedLibsModule, FindLanguageFromKeyPipe, IgiaAlertComponent, IgiaAlertErrorComponent, LoaderComponent } from './';

@NgModule({
    imports: [Cha2Ds2VascappSharedLibsModule],
    declarations: [FindLanguageFromKeyPipe, IgiaAlertComponent, IgiaAlertErrorComponent, LoaderComponent],
    exports: [Cha2Ds2VascappSharedLibsModule, FindLanguageFromKeyPipe, IgiaAlertComponent, IgiaAlertErrorComponent, LoaderComponent]
})
export class Cha2Ds2VascappSharedCommonModule {}
