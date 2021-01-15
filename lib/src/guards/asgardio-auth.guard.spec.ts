/**
 * Copyright (c) 2020, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
 */

import { TestBed } from "@angular/core/testing";
import { AsgardioAuthService } from "../services/asgardio-auth.service";
import { AsgardioNavigatorService } from "../services/asgardio-navigator.service";
import { AsgardioAuthGuard } from "./asgardio-auth.guard";

describe("AsgardioAuthGuard", () => {
    let guard: AsgardioAuthGuard;

    let authService: AsgardioAuthService;
    let authServiceStub: Partial<AsgardioAuthService>;

    let navigatorService: AsgardioNavigatorService;
    let navigatorServiceStub: Partial<AsgardioNavigatorService>;

    beforeEach(() => {
        authServiceStub = {
            signIn: () => Promise.resolve(),
            isAuthenticated: () => true
        };

        navigatorServiceStub = {
            navigateByUrl: (params) => Promise.resolve(true)
        };

        TestBed.configureTestingModule({
            providers: [
                {
                    provide: AsgardioAuthService,
                    useValue: authServiceStub
                },
                {
                    provide: AsgardioNavigatorService,
                    useValue: navigatorServiceStub
                }
            ]
        });
        guard = TestBed.inject(AsgardioAuthGuard);
        authService = TestBed.inject(AsgardioAuthService);
        navigatorService = TestBed.inject(AsgardioNavigatorService);
    });

    it("should be created", () => {
        expect(guard).toBeTruthy();
    });
});


