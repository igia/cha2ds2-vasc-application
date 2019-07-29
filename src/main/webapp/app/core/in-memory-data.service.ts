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
import { InMemoryDbService, ResponseOptions, RequestInfo, RequestInfoUtilities, ParsedRequestUrl } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
    createDb() {
        const accounts = [
            {
                id: 1,
                activated: true,
                authorities: ['ROLE_USER', 'ROLE_ADMIN'],
                email: 'admin@localhost.com',
                firstName: 'Admin',
                langKey: 'en',
                lastName: 'User',
                login: 'standalone',
                imageUrl: 'https://avatars1.githubusercontent.com/u/15997681?s=400&v=4'
            }
        ];

        const profileInfos = [
            {
                id: 1,
                activeProfiles: 'standalone',
                'display-ribbon-on-profiles': 'standalone'
            }
        ];

        return { accounts, profileInfos };
    }

    // Override request urls to comply with in memory collection data store
    parseRequestUrl(url: string, utils: RequestInfoUtilities): ParsedRequestUrl {
        let newUrl = this.interceptAccountUrl(url);
        newUrl = this.interceptProfileInfo(newUrl);
        return utils.parseRequestUrl(newUrl);
    }

    interceptAccountUrl(url: string) {
        return url.replace(/api\/account/, 'api/accounts/1');
    }

    interceptProfileInfo(url: string) {
        return url.replace(/management\/info/, 'api/profileInfos/1');
    }

    // Intercept response to add custom headers
    responseInterceptor(resOptions: ResponseOptions, reqInfo: RequestInfo) {
        // override response
        return resOptions;
    }
}
