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

import { Component, OnInit } from "@angular/core";
import { AsgardeoAuthService } from "@asgardeo/auth-angular";
import { default as authConfig } from "../config.json";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
    isInitLogin: boolean;
    isConfigured: boolean;
    userInfo: any;
    idToken: any;

    constructor(private auth: AsgardeoAuthService) {
        this.isConfigured = this.getClientIdStatus();
        this.isInitLogin = this.getIsInitLogin();
    }

    ngOnInit() {
        if (this.isInitLogin) {
            this.auth.signIn().then(() => {
                this.getUserInfo();
                this.getIdToken();
            });
        }
    }

    getClientIdStatus() {
        if (authConfig.clientID === "") { this.isConfigured = false; }
        else { return true; }
    }

    getIsInitLogin() {
        if (sessionStorage.getItem("isInitLogin") === "true") { return true; }
        else { return false; }
    }

    handleLogin() {
        this.auth.signIn().then(() => sessionStorage.setItem("isInitLogin", "true"));
    }

    handleLogout() {
        this.auth.signOut().then(() => sessionStorage.setItem("isInitLogin", "false"));
    }

    getUserInfo() {
        this.auth.getUserInfo().then((payload) => this.userInfo = payload);
    }

    getIdToken() {
        this.auth.getDecodedIDToken().then((payload) => this.idToken = payload);
    }
}
