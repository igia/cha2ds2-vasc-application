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
import { browser, by, ElementFinder } from 'protractor';
import { expect } from 'chai';

import { NavbarPage } from './page-objects/layout/navbar.po';
import { SignInPage } from './page-objects/layout/sign-in.po';

export const loginUser = async (username: string, password: string) => {
    browser.waitForAngularEnabled(false);
    await browser.get('/');

    await new SignInPage().autoLogin(username, password);
    browser.waitForAngularEnabled(true);

    // tslint:disable:no-unused-expression
    expect(await new NavbarPage().signOutMenu.isPresent()).to.be.true;
};

export const maximizeBrowser = () => {
    browser.driver
        .manage()
        .window()
        .maximize();
};
