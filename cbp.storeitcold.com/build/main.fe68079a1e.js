webpackJsonp([12], {
    104: function(n, l, t) {
        "use strict";
        t.d(l, "a", function() {
            return e
        });
        var e = function() {
            function n(n) {
                this.setFromVarF(n)
            }
            return n.prototype.getF = function() {
                return Math.round(this.valueF)
            }
            ,
            n.prototype.getDisp = function() {
                return Math.round(n.FtoDisplay(this.valueF))
            }
            ,
            n.prototype.strNumber = function() {
                return this.getDisp().toString()
            }
            ,
            n.prototype.strConcise = function() {
                var l = this.getDisp().toString();
                return l += n.strUnits()
            }
            ,
            n.prototype.strAscii = function() {
                var l = this.getDisp().toString();
                return l += n.celsius ? " degrees C" : " degrees F"
            }
            ,
            n.prototype.setValF = function(n) {
                this.valueF = n
            }
            ,
            n.prototype.setValDisplay = function(l) {
                this.valueF = n.displayToF(l)
            }
            ,
            n.prototype.setFromStringF = function(n) {
                this.valueF = parseFloat(n)
            }
            ,
            n.prototype.setFromVarF = function(n) {
                "number" == typeof n ? this.valueF = Number(n) : "string" == typeof n && (this.valueF = parseFloat(n))
            }
            ,
            n.celsiusMode = function() {
                return n.celsius
            }
            ,
            n.SetCelsiusMode = function(l) {
                n.celsius = l
            }
            ,
            n.strUnits = function() {
                return n.celsius ? "°C" : "°F"
            }
            ,
            n.displayToF = function(l) {
                return n.celsius ? n.CtoF(l) : l
            }
            ,
            n.FtoDisplay = function(l) {
                return n.celsius ? n.FtoC(l) : l
            }
            ,
            n.FtoC = function(n) {
                return .55556 * (n - 32)
            }
            ,
            n.CtoF = function(n) {
                return 1.8 * n + 32
            }
            ,
            n.celsius = !1,
            n
        }()
    },
    105: function(n, l, t) {
        "use strict";
        t.d(l, "a", function() {
            return a
        });
        t(3),
        t(13);
        var e = t(1)
          , u = (t.n(e),
        t(15),
        t(113))
          , i = t(70).b ? 3e3 : 6e3
          , o = [21, 14, 42, 180]
          , a = function() {
            function n(n, l) {
                var t = this;
                this.blynk = n,
                this.popoverCtrl = l,
                this.blynk.serverConnected$.subscribe(function(n) {
                    n && t.delayBeforePrompting()
                })
            }
            return n.prototype.delayBeforePrompting = function() {
                var n = this;
                console.log("Delaying before referral prompt."),
                setTimeout(function() {
                    return n.maybePrompt()
                }, i)
            }
            ,
            n.prototype.maybePrompt = function() {
                var n = this;
                this.safeToPrompt() ? this.needPrompt().then(function(l) {
                    l ? n.showPrompt() : console.log("No need to prompt for referral.")
                }) : console.log("Giving up referral prompting for this session.")
            }
            ,
            n.prototype.safeToPrompt = function() {
                return this.blynk.isLoggedIn() && this.blynk.devices.length > 0 && this.blynk.devices[0].isConnected
            }
            ,
            n.prototype.needPrompt = function() {
                return this.initReferrals().then(function(n) {
                    var l = o[n.prompts];
                    l || (l = o[o.length - 1]);
                    var t = e.duration(l, "days");
                    return e(n.lastPrompt).add(t).isBefore(e())
                })
            }
            ,
            n.prototype.initReferrals = function() {
                var n = this;
                return this.blynk.getAccountMetadata().then(function(l) {
                    if ("referrals"in l && "prompts"in l.referrals && "lastPrompt"in l.referrals)
                        return l.referrals;
                    var t = {
                        referrals: {
                            prompts: 0,
                            lastPrompt: new Date
                        }
                    };
                    return n.blynk.updateAccountMetadata(t, !1).then(function() {
                        return t
                    })
                })
            }
            ,
            n.prototype.logReferral = function() {
                var n = this;
                return console.log("Logging referral prompt."),
                this.blynk.getAccountMetadata().then(function(l) {
                    return n.blynk.updateAccountMetadata({
                        referrals: {
                            prompts: l.referrals.prompts + 1,
                            lastPrompt: new Date
                        }
                    }, !1)
                })
            }
            ,
            n.prototype.showPrompt = function() {
                var n = this;
                console.log("Showing referral prompt.");
                var l = this.popoverCtrl.create(u.a, void 0, {
                    enableBackdropDismiss: !1
                });
                l.onDidDismiss(function(l) {
                    l && n.logReferral()
                }),
                l.present()
            }
            ,
            n
        }()
    },
    110: function(n, l, t) {
        "use strict";
        t.d(l, "a", function() {
            return e
        });
        t(3),
        t(13);
        var e = function() {
            function n(n, l, t) {
                this.viewCtrl = n,
                this.blynk = l,
                this.toastCtrl = t
            }
            return n.prototype.ionViewDidLoad = function() {
                var n = this;
                this.blynk.getProfile().then(function(l) {
                    n.projects = l.dashBoards
                }).then(function() {
                    return n.blynk.findProject()
                }).then(function(l) {
                    n.projectSource = JSON.stringify(l, null, 2)
                })
            }
            ,
            n.prototype.closeDev = function() {
                this.viewCtrl.dismiss()
            }
            ,
            n.prototype.saveProject = function() {
                var n = this;
                this.blynk.findProject().then(function(l) {
                    var t = JSON.parse(n.projectSource);
                    t.id = l.id,
                    t.parentId = l.parentId,
                    n.blynk.tweakProject(l, t).then(function(l) {
                        return n.blynk.editProject(JSON.stringify(l))
                    }).then(function() {
                        return n.blynk.activateProject()
                    }).then(function() {
                        return n.presentToast("Saved the project and activated it.")
                    })
                })
            }
            ,
            n.prototype.update = function(n) {
                var l = this;
                this.blynk.findProject().then(function(n) {
                    return l.blynk.cleanProject(n)
                }).then(function(n) {
                    var t = n;
                    l.blynk.getAppProject().then(function(n) {
                        var e = t;
                        e.id = n.id,
                        e.parentId = n.parentId,
                        l.blynk.editProject(JSON.stringify(e)).then(function() {
                            return l.blynk.appSync()
                        }).then(function() {
                            return l.presentToast("Updated and published the project.")
                        })
                    })
                })
            }
            ,
            n.prototype.presentToast = function(n) {
                this.toastCtrl.create({
                    message: n,
                    duration: 3e3
                }).present()
            }
            ,
            n
        }()
    },
    112: function(n, l, t) {
        "use strict";
        t.d(l, "a", function() {
            return f
        });
        t(3),
        t(13);
        var e = t(35)
          , u = t.n(e)
          , i = t(86)
          , o = t(147)
          , a = t(77)
          , r = t(104)
          , s = t(70)
          , c = {
            connect: {
                text: "Connecting"
            },
            OK: {
                text: "Online"
            },
            Start: {
                text: "Online"
            },
            Sleep: {
                text: "Disabled"
            },
            ota: {
                text: "Updating"
            },
            RSSI: {
                text: "Online"
            },
            socket: {
                text: "Unknown"
            },
            server: {
                text: "Unknown"
            },
            offline: {
                text: "Offline"
            },
            Room: {
                text: "Online"
            },
            Fins: {
                text: "Online"
            },
            Heater: {
                text: "Online"
            },
            Hardware: {
                text: "Online"
            },
            Hot: {
                text: "Alert"
            },
            Cold: {
                text: "Alert"
            },
            "": {
                text: "Unknown"
            }
        }
          , d = {
            Alert: "danger",
            Online: "primary",
            Updating: "uncertain",
            Disabled: "uncertain",
            Unknown: "danger",
            Offline: "danger",
            "": "uncertain"
        }
          , h = 29
          , p = 68
          , g = ["setTemp", "finsSetTemp", "heaterDelay", "powerOn", "tooColdTemp", "tooHotTemp"]
          , f = function() {
            function n(n, l, t, e, u, a, c, d, g, f, _) {
                var m = this;
                this.nav = n,
                this.navParams = l,
                this.appCtrl = t,
                this.blynk = e,
                this.toastCtrl = u,
                this.modalCtrl = a,
                this.platform = c,
                this.alertCtrl = d,
                this.settings = g,
                this.masquerade = f,
                this.actionSheetCtrl = _,
                this.thresholds = {
                    lower: o.d,
                    upper: o.g
                },
                this.extendRange = !1,
                this.tSetMin = new r.a(32),
                this.tSetMax = new r.a(65),
                this.tColdMin = new r.a(h),
                this.tHotMax = new r.a(p),
                e.onPin("*", i.f, function(n, l, t) {
                    return m.maybeFinishUpdate(n, l, t)
                }),
                this.appVersion = s.a,
                this.settings.getValue("celsius").then(function(n) {
                    return r.a.SetCelsiusMode("1" == n)
                })
            }
            return n.prototype.ionViewDidLoad = function() {
                var n = this;
                this.blynk.getDevices(),
                this.coolbot_blynk().checkSavedSettings(),
                this.settings.getValue("extendRange").then(function(l) {
                    n.extendRange = "1" == l
                }),
                this.showSettings = this.platform.width() > 720,
                this.showDetails = this.platform.height() > 680 && !this.showSettings && 1 == this.blynk.devices.length
            }
            ,
            n.prototype.ionViewDidEnter = function() {
                this.extendRange && this.tHotMax.setValF(85),
                this.setSmsNumberState(),
                this.setExtraEmailState(),
                this.updateAllDevices(),
                this.blynk.persistent = !1
            }
            ,
            n.prototype.editBtnEnabled = function(n) {
                return !n.editMode || this.settingsDirty(n)
            }
            ,
            n.prototype.toggleEdit = function(n) {
                n.editMode = !n.editMode,
                n.editMode || (n.postFieldsIfChanged(g),
                this.blynk.tweakAndSaveProject())
            }
            ,
            n.prototype.settingsDirty = function(n) {
                return n.isAnyFieldChanged(g)
            }
            ,
            n.prototype.cancelEdit = function(n) {
                n.revertFields(g),
                n.updateThresholds(),
                n.editMode = !1
            }
            ,
            n.prototype.factoryResetSettings = function(n) {
                var l = this;
                this.presentConfirmationDialog("Factory Reset", "Reset all CoolBot settings?  WiFi settings will be kept.", function() {
                    l.blynk.setPin(n.id, o.y, 1)
                })
            }
            ,
            n.prototype.restoreDefaults = function(n) {
                n.revertAllFieldsToDefault(),
                n.updateThresholds()
            }
            ,
            n.prototype.showSettingsOptions = function(n) {
                var l = this;
                this.actionSheetCtrl.create({
                    title: "Saved Settings",
                    buttons: [{
                        text: "Save from CoolBot",
                        handler: function() {
                            l.saveSettings(n)
                        }
                    }, {
                        text: "Restore to CoolBot",
                        handler: function() {
                            l.restoreSettings(n)
                        }
                    }, {
                        text: "Delete saved set",
                        handler: function() {
                            l.deleteSettings()
                        }
                    }]
                }).present()
            }
            ,
            n.prototype.saveSettings = function(n) {
                var l = this;
                this.modalCtrl.create("NamedSettingsPage", {
                    title: "Save Settings from " + n.name,
                    instructions: "Type or select a name for this set of settings:",
                    actionVerb: "Save",
                    canAddNew: !0,
                    confirmExistingMsg: "Replace these saved settings?",
                    onOK: function(t) {
                        l.coolbot_blynk().saveSettings(n, t).then(function() {
                            l.presentToast("Saved settings for " + n.name + " as '" + t + "'.")
                        })
                    }
                }).present()
            }
            ,
            n.prototype.restoreSettings = function(n) {
                var l = this;
                this.modalCtrl.create("NamedSettingsPage", {
                    title: "Restore Settings to " + n.name,
                    instructions: "Select a set of settings to restore:",
                    actionVerb: "Restore",
                    onOK: function(t) {
                        l.coolbot_blynk().restoreSettings(n, t).then(function() {
                            l.presentToast("Restored '" + t + "' settings to " + n.name + ".")
                        })
                    }
                }).present()
            }
            ,
            n.prototype.deleteSettings = function() {
                var n = this;
                this.modalCtrl.create("NamedSettingsPage", {
                    title: "Delete Saved Settings Set",
                    instructions: "Select a set of settings to delete:",
                    actionVerb: "Delete",
                    onOK: function(l) {
                        n.coolbot_blynk().removeSettings(l).then(function() {
                            n.presentToast("Deleted saved settings sets '" + l + "'.")
                        })
                    }
                }).present()
            }
            ,
            n.prototype.coolbot_blynk = function() {
                return this.blynk
            }
            ,
            n.prototype.tempMargin = function() {
                return r.a.celsiusMode() ? 2 : 3
            }
            ,
            n.prototype.changeSetPoint = function(n, l) {
                var t = Math.round(n.value)
                  , e = l.setTemp.getDisp();
                if (t != e) {
                    var u = t - e
                      , i = !1
                      , o = this.tempMargin();
                    l.setTemp.setValDisplay(t);
                    var a = Number(l.thresholds.lower) + u
                      , r = Number(l.thresholds.upper) + u;
                    a = Math.min(a, t - o),
                    r = Math.max(r, t + o),
                    a = Math.max(a, this.tColdMin.getDisp()),
                    r = Math.min(r, this.tHotMax.getDisp()),
                    a != Number(l.thresholds.lower) && (i = !0),
                    r != Number(l.thresholds.upper) && (i = !0),
                    i && (l.tooColdTemp.setValDisplay(a),
                    l.tooHotTemp.setValDisplay(r),
                    l.updateThresholds())
                }
            }
            ,
            n.prototype.changeThreshold = function(n, l) {
                if (l.editMode) {
                    var t = this.tempMargin()
                      , e = l.setTemp.getDisp()
                      , u = Number(n.value.lower)
                      , i = Number(n.value.upper);
                    u = Math.min(u, e - t),
                    i = Math.max(i, e + t),
                    u == Number(l.thresholds.lower) && u == Number(n.value.lower) || l.tooColdTemp.setValDisplay(u),
                    i == Number(l.thresholds.upper) && i == Number(n.value.upper) || l.tooHotTemp.setValDisplay(i)
                }
            }
            ,
            n.prototype.updateAllDevices = function() {
                for (var n = 0, l = this.blynk.devices; n < l.length; n++) {
                    l[n].updateThresholds()
                }
            }
            ,
            n.prototype.reconfigure = function(n) {
                console.log("Reconfigure WiFi"),
                this.appCtrl.getRootNavs()[0].push(a.a, {
                    id: n
                })
            }
            ,
            n.prototype.updateFirmware = function(n) {
                this.presentToast(n.longTitle() + " is loading firmware..."),
                this.blynk.setPin(n.id, i.f, 1)
            }
            ,
            n.prototype.maybeFinishUpdate = function(n, l, t) {
                if ("1" == l && "0" == n && !document.hidden) {
                    var e = this.blynk.devices[t];
                    e.firmwareUpgrade && e.firmwareUpgrade() ? this.presentToast(e.longTitle() + " couldn't update its firmware.") : this.presentToast(e.longTitle() + " has firmware up to date at version " + e.firmwareVersion + ".")
                }
            }
            ,
            n.prototype.statusText = function(n) {
                return n.status in c ? c[n.status].text : c[""].text
            }
            ,
            n.prototype.statusColor = function(n) {
                var l = this.statusText(n);
                return l in d ? d[l] : d[""]
            }
            ,
            n.prototype.saveDevice = function(n, l) {
                var t = this;
                this.blynk.renameDevice(n, l).then(function() {
                    return t.blynk.tweakAndSaveProject()
                }).catch(function(n) {
                    return t.blynk.showError(n)
                })
            }
            ,
            n.prototype.saveError = function(n) {
                this.blynk.showError("Device names must be between 1 and 50 characters long.")
            }
            ,
            n.prototype.testNotification = function(n) {
                var l = this;
                if ((!n.notifyEmailOn || this.requireValidEmails()) && (!n.notifySmsOn || this.requireMobileNumber())) {
                    var t = this.blynk.getCachedPinFlag(n.id, o.p);
                    this.blynk.setPin(n.id, o.p, !t).then(function() {
                        return l.blynk.setPin(n.id, o.p, t)
                    }).then(function() {
                        return l.presentToast("Sent 'too hot' alert.")
                    })
                }
            }
            ,
            n.prototype.viewProfile = function() {
                this.nav.parent.select(2)
            }
            ,
            n.prototype.addNewDevice = function() {
                var n = this;
                this.blynk.createNewDevice().then(function(l) {
                    n.blynk.getDevices().then(function() {
                        return n.blynk.tweakAndSaveProject()
                    }).then(function() {
                        return n.reconfigure(l.id)
                    })
                })
            }
            ,
            n.prototype.deleteDevice = function(n) {
                var l = this;
                this.presentConfirmationDialog("Delete CoolBot?", "About to delete this CoolBot from your account.", function() {
                    l.blynk.deleteDevice(n.id).then(function() {
                        return l.blynk.getDevices()
                    }).then(function() {
                        return l.blynk.tweakAndSaveProject()
                    })
                })
            }
            ,
            n.prototype.deviceProvisioned = function(n) {
                return n.connectTime
            }
            ,
            n.prototype.refreshApp = function() {
                window.location.assign("/")
            }
            ,
            n.prototype.setListState = function(n, l, t) {
                var e = "OK";
                if (l) {
                    for (var u = 0, i = l; u < i.length; u++) {
                        var o = i[u];
                        if (o.val) {
                            if (!t(o.val))
                                return void (this[n] = "invalid")
                        } else
                            e = "empty"
                    }
                    this[n] = e
                } else
                    this[n] = "empty"
            }
            ,
            n.prototype.setSmsNumberState = function() {
                var n = this
                  , l = this.blynk;
                l.getMobileNumbers().then(function(t) {
                    return n.setListState("smsNumberState", t, l.isPhoneNumberValid)
                })
            }
            ,
            n.prototype.setExtraEmailState = function() {
                var n = this
                  , l = this.blynk;
                l.getExtraEmails().then(function(t) {
                    return n.setListState("extraEmailState", t, l.isEmailValid)
                })
            }
            ,
            n.prototype.requireValidState = function(n, l) {
                var t = this;
                return "OK" == this[n] || (this.presentConfirmationDialog(u.a.startCase(l), "Your " + l + " is missing or incorrect.  Fix it now?", function() {
                    t.nav.parent.select(2)
                }),
                !1)
            }
            ,
            n.prototype.requireMobileNumber = function() {
                return this.requireValidState("smsNumberState", "mobile number")
            }
            ,
            n.prototype.requireValidEmails = function() {
                return this.requireValidState("extraEmailState", "extra email address")
            }
            ,
            n.prototype.presentConfirmationDialog = function(n, l, t) {
                this.alertCtrl.create({
                    title: n,
                    message: l,
                    buttons: [{
                        text: "Cancel",
                        role: "cancel"
                    }, {
                        text: "OK",
                        handler: t
                    }]
                }).present()
            }
            ,
            n.prototype.presentToast = function(n) {
                this.toastCtrl.create({
                    message: n,
                    duration: 5e3
                }).present()
            }
            ,
            n
        }()
    },
    113: function(n, l, t) {
        "use strict";
        t.d(l, "a", function() {
            return e
        });
        t(3),
        t(13);
        var e = function() {
            function n(n, l) {
                this.viewCtrl = n,
                this.navParams = l
            }
            return n.prototype.refer = function() {
                this.viewCtrl.dismiss(!0)
            }
            ,
            n.prototype.snooze = function() {
                this.viewCtrl.dismiss(!1)
            }
            ,
            n.prototype.no = function() {
                this.viewCtrl.dismiss(!0)
            }
            ,
            n
        }()
    },
    114: function(n, l, t) {
        "use strict";
        t.d(l, "a", function() {
            return i
        });
        t(3),
        t(13);
        var e = t(110)
          , u = t(104)
          , i = function() {
            function n(n, l, t, e, u, i, o, a, r) {
                var s = this;
                this.nav = n,
                this.navParams = l,
                this.modalCtrl = t,
                this.masquerade = e,
                this.blynk = u,
                this.settings = i,
                this.onboarding = o,
                this.subs = a,
                this.alertCtrl = r,
                this.accountName = "",
                this.fullName = "",
                this.extraEmails = [],
                this.mobileNumbers = [{
                    val: ""
                }],
                this.showDev = !1,
                this.extendRange = !1,
                this.settings.getValue("celsius").then(function(n) {
                    s.celsiusMode = n
                })
            }
            return n.prototype.ngAfterViewInit = function() {
                this.onboarding.ensureLogin()
            }
            ,
            n.prototype.ionViewDidEnter = function() {
                var n = this
                  , l = this.blynk;
                this.accountName = this.blynk.account,
                l.getAccountMetadata().then(function(l) {
                    n.fullName = l.fullName
                }),
                l.getMobileNumbers().then(function(l) {
                    n.mobileNumbers = l
                }),
                l.getExtraEmails().then(function(l) {
                    n.extraEmails = l
                }),
                this.blynk.isDeveloper().then(function(l) {
                    return n.showDev = l
                }),
                this.settings.getValue("extendRange").then(function(l) {
                    return n.extendRange = l
                }),
                this.blynk.persistent = !1
            }
            ,
            n.prototype.logout = function() {
                this.masquerade.logout()
            }
            ,
            n.prototype.showDevPage = function() {
                this.modalCtrl.create(e.a).present()
            }
            ,
            n.prototype.changeFullName = function() {
                this.blynk.updateAccountMetadata({
                    fullName: this.fullName
                })
            }
            ,
            n.prototype.changeMobileNumbers = function() {
                this.blynk.setMobileNumbers(this.mobileNumbers)
            }
            ,
            n.prototype.addMobileNumber = function() {
                this.mobileNumbers.push({
                    val: ""
                })
            }
            ,
            n.prototype.deleteMobileNumber = function(n) {
                this.mobileNumbers.splice(n, 1),
                this.changeMobileNumbers()
            }
            ,
            n.prototype.addEmail = function() {
                this.extraEmails.push({
                    val: ""
                })
            }
            ,
            n.prototype.changeExtraEmails = function() {
                this.blynk.setExtraEmails(this.extraEmails)
            }
            ,
            n.prototype.deleteExtraEmail = function(n) {
                this.extraEmails.splice(n, 1),
                this.changeExtraEmails()
            }
            ,
            n.prototype.toggleCelsius = function() {
                u.a.SetCelsiusMode("1" == this.celsiusMode),
                this.settings.setValue("celsius", this.celsiusMode),
                this.blynk.tweakAndSaveProjectSoon()
            }
            ,
            n.prototype.changeRange = function() {
                this.settings.setValue("extendRange", this.extendRange)
            }
            ,
            n.prototype.requestSupport = function() {
                this.modalCtrl.create("SupportPage").present()
            }
            ,
            n.prototype.doMasquerade = function() {
                var n = this;
                this.masquerade.masquerade(this.targetUser).catch(function(l) {
                    return n.showError(l)
                })
            }
            ,
            n.prototype.showError = function(n) {
                var l, t;
                n.error ? (l = n.error.error,
                t = n.error.message) : (l = "Error",
                t = n);
                this.alertCtrl.create({
                    title: l,
                    subTitle: t,
                    buttons: ["OK"]
                }).present()
            }
            ,
            n
        }()
    },
    116: function(n, l, t) {
        "use strict";
        t.d(l, "a", function() {
            return e
        });
        t(3),
        t(13);
        var e = function() {
            function n(n, l, t, e, u, i, o, a) {
                this.navCtrl = n,
                this.navParams = l,
                this.menuCtrl = t,
                this.alertCtrl = e,
                this.loadingCtrl = u,
                this.blynk = i,
                this.settings = o,
                this.onboarding = a,
                this.registerCredentials = {
                    email: "",
                    password: "",
                    confirm_password: ""
                }
            }
            return n.prototype.ngAfterViewInit = function() {
                var n = this;
                setTimeout(function() {
                    return n.emailBox.setFocus()
                }, 600)
            }
            ,
            n.prototype.ionViewDidLoad = function() {
                console.log("ionViewDidLoad RegisterPage")
            }
            ,
            n.prototype.ionViewDidEnter = function() {
                this.menuCtrl.enable(!1, "right")
            }
            ,
            n.prototype.ionViewWillLeave = function() {
                this.menuCtrl.enable(!0, "right")
            }
            ,
            n.prototype.isEmailValid = function() {
                return "" != this.registerCredentials.email
            }
            ,
            n.prototype.register = function() {
                var n = this;
                this.showLoading(),
                this.registerCredentials.email = this.registerCredentials.email.toLowerCase().trim();
                var l = this.blynk.hashPassword(this.registerCredentials.password, this.registerCredentials.email);
                this.blynk.setCredentials(this.registerCredentials.email, l),
                this.blynk.doRegister().then(function(l) {
                    return n.blynk.doLoginAndReload()
                }).then(function(l) {
                    n.settings.setValue("account", n.registerCredentials.email)
                }).then(function() {
                    return n.loading.dismiss()
                }).then(function() {
                    return n.settings.setValue("passwordHash", l)
                }).then(function() {
                    return n.blynk.updateAccountMetadata({
                        accountCreated: new Date
                    })
                }).then(function() {
                    return n.onboarding.updatePage()
                }).catch(function(l) {
                    n.showError(l),
                    n.settings.setValue("passwordHash", "")
                })
            }
            ,
            n.prototype.showLoading = function(n) {
                void 0 === n && (n = "Creating account"),
                this.loading = this.loadingCtrl.create({
                    content: n + "...",
                    dismissOnPageChange: !0
                }),
                this.loading.present()
            }
            ,
            n.prototype.showError = function(n, l) {
                void 0 === l && (l = "Couldn't create account"),
                this.loading && this.loading.dismiss();
                this.alertCtrl.create({
                    title: l,
                    subTitle: n,
                    buttons: ["OK"]
                }).present()
            }
            ,
            n
        }()
    },
    144: function(n, l, t) {
        "use strict";
        function e(n) {
            var l = u()
              , t = new Date(n);
            return l.isSame(n, "day") ? t.toLocaleTimeString([], {
                hour: "numeric",
                minute: "numeric"
            }) : Math.abs(l.diff(n, "weeks")) < 1 ? t.toLocaleDateString([], {
                weekday: "short"
            }) + " " + t.toLocaleTimeString([], {
                hour: "numeric",
                minute: "numeric"
            }) : t.toLocaleDateString([], {
                year: "numeric",
                month: "short",
                day: "numeric"
            })
        }
        l.b = e,
        t.d(l, "a", function() {
            return i
        });
        t(3);
        var u = t(1)
          , i = (t.n(u),
        function() {
            function n() {
                this.empty = "none",
                this.showLong = !1
            }
            return n.prototype.ngOnChanges = function() {
                this.format()
            }
            ,
            n.prototype.timeValue = function() {
                return new Date(this.timestamp)
            }
            ,
            n.prototype.toggleLong = function() {
                this.showLong = !this.showLong,
                this.format()
            }
            ,
            n.prototype.format = function() {
                this.timestamp ? (this.longString = this.timeValue().toLocaleDateString() + " " + this.timeValue().toLocaleTimeString([], {
                    hour: "numeric",
                    minute: "numeric"
                }),
                this.shortString = this.showLong ? this.longString : e(this.timestamp)) : (this.shortString = this.empty,
                this.longString = "")
            }
            ,
            n
        }())
    },
    145: function(n, l, t) {
        "use strict";
        t.d(l, "a", function() {
            return u
        });
        t(3);
        var e = t(0)
          , u = function() {
            function n() {
                this.show = !1,
                this.toggled = new e.l
            }
            return n.prototype.toggleShow = function() {
                var n = this;
                this.show = !this.show,
                this.toggled.emit(this.show),
                this.show && setTimeout(function() {
                    return n.panelContent.nativeElement.scrollIntoView({
                        behavior: "smooth",
                        block: "end"
                    })
                }, 300)
            }
            ,
            n
        }()
    },
    146: function(n, l, t) {
        "use strict";
        t.d(l, "a", function() {
            return e
        });
        t(3);
        var e = function() {
            function n() {
                this.inputType = "password"
            }
            return n.prototype.toggle = function() {
                this.inputType = "password" == this.inputType ? "text" : "password"
            }
            ,
            n
        }()
    },
    147: function(n, l, t) {
        "use strict";
        var e = 30
          , u = 52
          , i = 42
          , o = 1
          , a = 1
          , r = !0
          , s = t(403)
          , c = t.n(s)
          , d = t(35)
          , h = t.n(d)
          , p = t(86)
          , g = function() {
            function n(n, l) {
                var t = this;
                this.blynk = n,
                this.update(l),
                this.status = "ONLINE" == l.status ? "OK" : "offline",
                this._lastActivityTime = new Date(l.disconnectTime),
                new Date(l.connectTime) > this._lastActivityTime && (this._lastActivityTime = new Date(l.connectTime)),
                this.blynk.onPin(this._id, p.b, function(n, l) {
                    return t.onStatus(n)
                }),
                this.serverConnectedSub = this.blynk.serverConnected$.subscribe(function(n) {
                    return t.onBlynkConnected(n)
                }),
                this.hardwareActivitySub = this.blynk.hardwareActivity$.subscribe(function(n) {
                    return t.onHardwareActivity(n)
                })
            }
            return n.prototype.update = function(n) {
                this._id = n.id,
                this._name = n.name,
                this._disconnectTime = new Date(n.disconnectTime),
                this._startObservingTime = new Date
            }
            ,
            Object.defineProperty(n.prototype, "id", {
                get: function() {
                    return this._id
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(n.prototype, "name", {
                get: function() {
                    return this._name
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(n.prototype, "isConnected", {
                get: function() {
                    return this._isConnected
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(n.prototype, "status", {
                get: function() {
                    return this._status
                },
                set: function(n) {
                    this._status = n
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(n.prototype, "lastActivityTime", {
                get: function() {
                    return this._lastActivityTime
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(n.prototype, "disconnectTime", {
                get: function() {
                    return this._disconnectTime
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(n.prototype, "startObservingTime", {
                get: function() {
                    return this._startObservingTime
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(n.prototype, "inactiveMs", {
                get: function() {
                    return Date.now() - this.lastActivityTime.getTime()
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(n.prototype, "observingMs", {
                get: function() {
                    return Date.now() - this.startObservingTime.getTime()
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(n.prototype, "isProvisioned", {
                get: function() {
                    return this._lastActivityTime.valueOf() > 0
                },
                enumerable: !0,
                configurable: !0
            }),
            n.prototype.onStatus = function(n) {
                this._isConnected && (this.lastReportedStatus = n,
                this.status = n),
                "ota" == n && (this._isConnected = !1,
                this.forgetFirmware())
            }
            ,
            n.prototype.onBlynkConnected = function(n) {
                n ? this.status = this.lastReportedStatus : "server" != this.status && (this.status = "socket")
            }
            ,
            n.prototype.onHardwareActivity = function(n) {
                n.deviceId == this.id && (n.active ? this._lastActivityTime = new Date : (this._isConnected && (this._disconnectTime = new Date),
                this.status = this.blynk.getCachedPinFlag(this.id, p.f) ? "ota" : "offline",
                this.forgetFirmware()),
                this._isConnected = n.active)
            }
            ,
            n.prototype.projectName = function() {
                return "device"
            }
            ,
            n.prototype.isNameSet = function() {
                return "" != this._name && this._name != this.projectName()
            }
            ,
            n.prototype.longTitle = function(n) {
                void 0 === n && (n = !0);
                var l;
                return l = this.isNameSet() ? "the " + this.projectName() + " named '" + this.name + "'" : "your " + this.projectName(),
                n && (l = h.a.upperFirst(l)),
                l
            }
            ,
            n.prototype.firmwareUpgrade = function() {}
            ,
            n.prototype.forgetFirmware = function() {}
            ,
            n
        }()
          , f = this && this.__extends || function() {
            var n = Object.setPrototypeOf || {
                __proto__: []
            }instanceof Array && function(n, l) {
                n.__proto__ = l
            }
            || function(n, l) {
                for (var t in l)
                    l.hasOwnProperty(t) && (n[t] = l[t])
            }
            ;
            return function(l, t) {
                function e() {
                    this.constructor = l
                }
                n(l, t),
                l.prototype = null === t ? Object.create(t) : (e.prototype = t.prototype,
                new e)
            }
        }()
          , _ = function(n) {
            function l(l, t) {
                var e = n.call(this, l, t) || this;
                return e._pinAssignments = e.pinAssignments(),
                e._pinTypes = e.pinTypes(),
                e.trackFields(["macAddress", "rssi"]),
                e
            }
            return f(l, n),
            l.prototype.pinTypes = function() {
                return [{
                    name: "string",
                    convertIn: function(n) {
                        return n
                    },
                    convertOut: function(n) {
                        return n
                    }
                }, {
                    name: "number",
                    convertIn: function(n) {
                        return parseFloat(n)
                    },
                    convertOut: function(n) {
                        return String(n)
                    }
                }, {
                    name: "integer",
                    convertIn: function(n) {
                        return Math.round(parseFloat(n))
                    },
                    convertOut: function(n) {
                        return String(Math.round(n))
                    }
                }, {
                    name: "flag",
                    convertIn: function(n) {
                        return 1 == n
                    },
                    convertOut: function(n) {
                        return 1 === n || "true" === n || !0 === n
                    }
                }]
            }
            ,
            l.prototype.pinAssignments = function() {
                var n = this;
                return [{
                    name: "status",
                    pin: p.b
                }, {
                    name: "macAddress",
                    pin: p.e
                }, {
                    name: "rssi",
                    pin: p.g,
                    typeName: "number",
                    afterChange: function(l) {
                        return n.afterSetRssi(l)
                    }
                }, {
                    name: "firmwareVersion",
                    pin: p.c
                }, {
                    name: "hardwareVersion",
                    pin: p.d
                }, {
                    name: "coolbotVersion",
                    pin: p.a
                }]
            }
            ,
            l.prototype.remapRange = function(n, l, t, e, u) {
                var i = (n - l) * (u - e) / (t - l) + e;
                return i = Math.max(i, e),
                i = Math.min(i, u)
            }
            ,
            l.prototype.afterSetRssi = function(n) {
                this.wifiStrength = String(this.remapRange(n, -95, -25, 0, 100).toFixed(0)) + "%"
            }
            ,
            l.prototype.forgetFirmware = function() {
                n.prototype.forgetFirmware.call(this),
                this.firmwareVersion = void 0,
                this.hardwareVersion = void 0,
                this.blynk.clearPinCache(this.id, p.c),
                this.blynk.clearPinCache(this.id, p.d)
            }
            ,
            l.prototype.fillOutPinDef = function(n) {
                var l = this
                  , t = n;
                t.typeName || (t.typeName = "string");
                var e = h.a.find(this._pinTypes, ["name", t.typeName]);
                if (!e)
                    throw "Unrecognized field type '" + e + "'.";
                if (!t.name)
                    throw "Nameless field found.";
                if (void 0 === t.pin)
                    throw "Need to specify a pin for field '" + t.name + "'.";
                return t.convertIn || (t.convertIn = e.convertIn),
                t.convertOut || (t.convertOut = e.convertOut),
                t.onChange || (t.onChange = function(n) {
                    return l[t.name] = n
                }
                ),
                t.afterChange || (t.afterChange = function(n) {}
                ),
                t.afterPost || (t.afterPost = function(n) {
                    return n
                }
                ),
                t
            }
            ,
            l.prototype.findField = function(n) {
                var l = h.a.find(this._pinAssignments, ["name", n]);
                if (!l)
                    throw "Undefined device field '" + n + "'.";
                return this.fillOutPinDef(l)
            }
            ,
            l.prototype.trackPinDef = function(n) {
                this.blynk.trackPin(this.id, n.pin, function(l) {
                    var t = n.convertIn(l);
                    n.onChange(t),
                    n.afterChange(t)
                })
            }
            ,
            l.prototype.trackField = function(n) {
                var l = this.findField(n);
                this.trackPinDef(l)
            }
            ,
            l.prototype.postField = function(n) {
                var l = this.findField(n);
                return this.blynk.setPin(this.id, l.pin, l.convertOut(this[n])).then(l.afterPost)
            }
            ,
            l.prototype.isFieldChanged = function(n) {
                var l = this.findField(n)
                  , t = this.blynk.getCachedPin(this.id, l.pin);
                return l.convertOut(this[n]) != t
            }
            ,
            l.prototype.postFieldIfChanged = function(n) {
                return this.isFieldChanged(n) ? this.postField(n) : Promise.resolve(!0)
            }
            ,
            l.prototype.revertField = function(n) {
                var l = this.findField(n)
                  , t = l.convertOut(this[n])
                  , e = this.blynk.getCachedPin(this.id, l.pin);
                if (t != e) {
                    var u = l.convertIn(e);
                    this[n] = u,
                    l.afterChange(u)
                }
            }
            ,
            l.prototype.revertFieldToDefault = function(n) {
                var l = this.findField(n);
                void 0 !== l.defaultVal && this[n] != l.defaultVal && (this[n] = l.defaultVal,
                l.afterChange(l.defaultVal))
            }
            ,
            l.prototype.trackFields = function(n) {
                for (var l = 0, t = n; l < t.length; l++) {
                    this.trackField(t[l])
                }
            }
            ,
            l.prototype.trackAllFields = function() {
                for (var n = 0, l = this._pinAssignments; n < l.length; n++) {
                    var t = l[n];
                    this.blynk.isHandlingPin(this.id, t.pin) || this.trackPinDef(this.fillOutPinDef(t))
                }
            }
            ,
            l.prototype.isAnyFieldChanged = function(n) {
                for (var l = 0, t = n; l < t.length; l++) {
                    if (this.isFieldChanged(t[l]))
                        return !0
                }
                return !1
            }
            ,
            l.prototype.postFieldsIfChanged = function(n) {
                for (var l = 0, t = n; l < t.length; l++) {
                    this.postFieldIfChanged(t[l])
                }
            }
            ,
            l.prototype.revertFields = function(n) {
                for (var l = 0, t = n; l < t.length; l++) {
                    this.revertField(t[l])
                }
            }
            ,
            l.prototype.revertAllFieldsToDefault = function() {
                for (var n = 0, l = this._pinAssignments; n < l.length; n++) {
                    this.revertFieldToDefault(l[n].name)
                }
            }
            ,
            l
        }(g)
          , m = t(104)
          , v = this && this.__extends || function() {
            var n = Object.setPrototypeOf || {
                __proto__: []
            }instanceof Array && function(n, l) {
                n.__proto__ = l
            }
            || function(n, l) {
                for (var t in l)
                    l.hasOwnProperty(t) && (n[t] = l[t])
            }
            ;
            return function(l, t) {
                function e() {
                    this.constructor = l
                }
                n(l, t),
                l.prototype = null === t ? Object.create(t) : (e.prototype = t.prototype,
                new e)
            }
        }()
          , b = "7.9.3"
          , y = {
            "7.4.0": b,
            "7.4.1": b,
            "7.4.2": b,
            "7.4.3": b,
            "7.4.4": b,
            "7.4.5": b,
            "7.4.6": b,
            "7.4.7": b,
            "7.4.8": b,
            "7.4.9": b,
            "7.4.10": b,
            "7.4.11": b,
            "7.4.12": b,
            "7.4.13": b,
            "7.4.14": b,
            "7.5.0": b,
            "7.6.0": b,
            "7.6.1": b,
            "7.6.2": b,
            "7.6.3": b,
            "7.6.4": b,
            "7.6.5": b,
            "7.6.6": b,
            "7.6.7": b,
            "7.7.0": b,
            "7.8.0": b,
            "7.8.1": b,
            "7.9.0": b,
            "7.9.1": b,
            "7.9.2": b,
            "7.10.0": b,
            "7.10.1": b,
            "7.10.2": b,
            "7.10.3": b,
            "7.10.4": b,
            "7.10.5": b,
            "7.10.8": b,
            "7.10.9": b,
            "7.10.10": b,
            "7.10.11": b,
            "8.0.0": "8.0.6",
            "8.0.1": "8.0.6",
            "8.0.2": "8.0.6",
            "8.0.3": "8.0.6",
            "8.0.4": "8.0.6",
            "8.0.5": "8.0.6"
        }
          , C = function(n) {
            function l(l, t) {
                var s = n.call(this, l, t) || this;
                return s.roomTemp = new m.a(NaN),
                s.finsTemp = new m.a(0),
                s.setTemp = new m.a(i),
                s.finsSetTemp = o,
                s.tooColdTemp = new m.a(e),
                s.tooHotTemp = new m.a(u),
                s.heaterDelay = a,
                s.powerOn = r,
                s.editMode = !1,
                s.thresholds = {
                    lower: void 0,
                    upper: void 0
                },
                s.trackAllFields(),
                s.updatePinSchema(),
                s
            }
            return v(l, n),
            l.prototype.pinTypes = function() {
                return n.prototype.pinTypes.call(this).concat([{
                    name: "temp",
                    convertIn: function(n) {
                        return new m.a(n)
                    },
                    convertOut: function(n) {
                        return n.getF()
                    }
                }])
            }
            ,
            l.prototype.pinAssignments = function() {
                var l = this;
                return n.prototype.pinAssignments.call(this).concat([{
                    name: "roomTemp",
                    pin: 0,
                    typeName: "temp",
                    afterChange: function() {
                        return l.newReading = !l.newReading
                    }
                }, {
                    name: "finsTemp",
                    pin: 1,
                    typeName: "temp"
                }, {
                    name: "heaterOn",
                    pin: 26,
                    typeName: "flag"
                }, {
                    name: "setTemp",
                    pin: 4,
                    typeName: "temp",
                    getsSaved: !0,
                    defaultVal: new m.a(i)
                }, {
                    name: "finsSetTemp",
                    pin: 6,
                    typeName: "integer",
                    getsSaved: !0,
                    defaultVal: o
                }, {
                    name: "tooColdTemp",
                    pin: 16,
                    typeName: "temp",
                    getsSaved: !0,
                    defaultVal: new m.a(e),
                    afterChange: function() {
                        return l.updateThresholds()
                    }
                }, {
                    name: "tooHotTemp",
                    pin: 12,
                    typeName: "temp",
                    getsSaved: !0,
                    defaultVal: new m.a(u),
                    afterChange: function() {
                        return l.updateThresholds()
                    }
                }, {
                    name: "heaterDelay",
                    pin: 8,
                    typeName: "integer",
                    getsSaved: !0,
                    defaultVal: a
                }, {
                    name: "powerOn",
                    pin: 9,
                    typeName: "flag",
                    getsSaved: !0,
                    defaultVal: r
                }, {
                    name: "notifyOn",
                    pin: 10,
                    typeName: "flag",
                    afterPost: function() {
                        return l.blynk.tweakAndSaveProjectSoon()
                    }
                }, {
                    name: "notifyEmailOn",
                    pin: 22,
                    typeName: "flag",
                    afterPost: function() {
                        return l.blynk.tweakAndSaveProjectSoon()
                    }
                }, {
                    name: "notifySmsOn",
                    pin: 23,
                    typeName: "flag",
                    afterPost: function() {
                        return l.blynk.tweakAndSaveProjectSoon()
                    }
                }, {
                    name: "offlineFlag",
                    pin: 100,
                    typeName: "flag"
                }])
            }
            ,
            l.prototype.savedPinValues = function() {
                var n = this
                  , l = h.a.filter(this._pinAssignments, function(n) {
                    return n.getsSaved
                })
                  , t = {};
                return h.a.forIn(l, function(l) {
                    var e = n[l.name];
                    "temp" == l.typeName && (e = e.getF()),
                    t[l.name] = e
                }),
                t
            }
            ,
            l.prototype.restoreSavedPinValues = function(n) {
                var l = this;
                h.a.forIn(n, function(n, t) {
                    "temp" == h.a.find(l._pinAssignments, function(n) {
                        return n.name == t
                    }).typeName && (n = new m.a(n)),
                    console.log("restore:", t, "=", n),
                    l[t] = n,
                    l.postFieldIfChanged(t)
                }),
                this.updateThresholds()
            }
            ,
            l.prototype.projectName = function() {
                return "CoolBot"
            }
            ,
            l.prototype.isNameSet = function() {
                return n.prototype.isNameSet.call(this) && "ESP8266" != this.name
            }
            ,
            l.prototype.firmwareUpgrade = function() {
                return y[this.firmwareVersion]
            }
            ,
            l.prototype.updateThresholds = function() {
                this.thresholds = {
                    lower: this.tooColdTemp.getDisp(),
                    upper: this.tooHotTemp.getDisp()
                }
            }
            ,
            l.prototype.updatePinSchema = function() {
                this.notifyOn || (this.notifyOn = !0,
                this.notifySmsOn = !1,
                this.notifyEmailOn = !1,
                this.postFieldIfChanged("notifyOn"),
                this.postFieldIfChanged("notifySmsOn"),
                this.postFieldIfChanged("notifyEmailOn"))
            }
            ,
            l.prototype.canShowHeaterOn = function() {
                return c.a.satisfies(this.firmwareVersion, " >= 7.9.0")
            }
            ,
            l
        }(_)
          , w = t(404);
        t.d(l, "z", function() {
            return 0
        }),
        t.d(l, "i", function() {
            return 1
        }),
        t.d(l, "k", function() {
            return 26
        }),
        t.d(l, "A", function() {
            return 4
        }),
        t.d(l, "h", function() {
            return 6
        }),
        t.d(l, "j", function() {
            return 8
        }),
        t.d(l, "B", function() {
            return 9
        }),
        t.d(l, "l", function() {
            return 10
        }),
        t.d(l, "q", function() {
            return 12
        }),
        t.d(l, "p", function() {
            return 13
        }),
        t.d(l, "n", function() {
            return 14
        }),
        t.d(l, "s", function() {
            return 16
        }),
        t.d(l, "r", function() {
            return 17
        }),
        t.d(l, "y", function() {
            return 21
        }),
        t.d(l, "u", function() {
            return 22
        }),
        t.d(l, "w", function() {
            return 23
        }),
        t.d(l, "v", function() {
            return 24
        }),
        t.d(l, "t", function() {
            return 30
        }),
        t.d(l, "m", function() {
            return 31
        }),
        t.d(l, "o", function() {
            return 32
        }),
        t.d(l, "x", function() {
            return 100
        }),
        t.d(l, "d", function() {
            return e
        }),
        t.d(l, "g", function() {
            return u
        }),
        t.d(l, "e", function() {
            return i
        }),
        t.d(l, "b", function() {
            return o
        }),
        t.d(l, "c", function() {
            return a
        }),
        t.d(l, "f", function() {
            return r
        }),
        t.d(l, "a", function() {
            return C
        }),
        t.d(l, !1, function() {
            return w.a
        })
    },
    149: function(n, l, t) {
        "use strict";
        t.d(l, "a", function() {
            return o
        });
        t(3);
        var e = t(112)
          , u = t(150)
          , i = t(114)
          , o = function() {
            function n(n, l, t) {
                this.monitor = n,
                this.w = l,
                this.masquerade = t,
                this.tab1Root = u.a,
                this.tab2Root = e.a,
                this.tab3Root = i.a
            }
            return n.prototype.ionViewDidLoad = function() {}
            ,
            n.prototype.clickLogo = function() {
                this.w.open("https://www.storeitcold.com/support", "_blank")
            }
            ,
            n
        }()
    },
    15: function(n, l, t) {
        "use strict";
        var e, u = t(3), i = (t(0),
        t(64)), o = (t(13),
        t(54)), a = (t(462),
        t(35)), r = t.n(a), s = (t(32),
        t(465)), c = t.n(s), d = t(81);
        !function(n) {
            n[n.RESPONSE = 0] = "RESPONSE",
            n[n.REGISTER = 1] = "REGISTER",
            n[n.LOGIN = 2] = "LOGIN",
            n[n.REDEEM = 3] = "REDEEM",
            n[n.HARDWARE_CONNECTED = 4] = "HARDWARE_CONNECTED",
            n[n.GET_TOKEN = 5] = "GET_TOKEN",
            n[n.PING = 6] = "PING",
            n[n.ACTIVATE_DASHBOARD = 7] = "ACTIVATE_DASHBOARD",
            n[n.DEACTIVATE_DASHBOARD = 8] = "DEACTIVATE_DASHBOARD",
            n[n.REFRESH_TOKEN = 9] = "REFRESH_TOKEN",
            n[n.GET_GRAPH_DATA = 10] = "GET_GRAPH_DATA",
            n[n.GET_GRAPH_DATA_RESPONSE = 11] = "GET_GRAPH_DATA_RESPONSE",
            n[n.TWEET = 12] = "TWEET",
            n[n.EMAIL = 13] = "EMAIL",
            n[n.NOTIFY = 14] = "NOTIFY",
            n[n.BRIDGE = 15] = "BRIDGE",
            n[n.HW_SYNC = 16] = "HW_SYNC",
            n[n.HW_INFO = 17] = "HW_INFO",
            n[n.SMS = 18] = "SMS",
            n[n.SET_WIDGET_PROPERTY = 19] = "SET_WIDGET_PROPERTY",
            n[n.HARDWARE = 20] = "HARDWARE",
            n[n.CREATE_DASH = 21] = "CREATE_DASH",
            n[n.UPDATE_DASH = 22] = "UPDATE_DASH",
            n[n.DELETE_DASH = 23] = "DELETE_DASH",
            n[n.LOAD_PROFILE_GZIPPED = 24] = "LOAD_PROFILE_GZIPPED",
            n[n.APP_SYNC = 25] = "APP_SYNC",
            n[n.SHARING = 26] = "SHARING",
            n[n.ADD_PUSH_TOKEN = 27] = "ADD_PUSH_TOKEN",
            n[n.EXPORT_GRAPH_DATA = 28] = "EXPORT_GRAPH_DATA",
            n[n.GET_SHARED_DASH = 29] = "GET_SHARED_DASH",
            n[n.GET_SHARE_TOKEN = 30] = "GET_SHARE_TOKEN",
            n[n.REFRESH_SHARE_TOKEN = 31] = "REFRESH_SHARE_TOKEN",
            n[n.SHARE_LOGIN = 32] = "SHARE_LOGIN",
            n[n.CREATE_WIDGET = 33] = "CREATE_WIDGET",
            n[n.UPDATE_WIDGET = 34] = "UPDATE_WIDGET",
            n[n.DELETE_WIDGET = 35] = "DELETE_WIDGET",
            n[n.GET_ENERGY = 36] = "GET_ENERGY",
            n[n.ADD_ENERGY = 37] = "ADD_ENERGY",
            n[n.UPDATE_PROJECT_SETTINGS = 38] = "UPDATE_PROJECT_SETTINGS",
            n[n.ASSIGN_TOKEN = 39] = "ASSIGN_TOKEN",
            n[n.GET_SERVER = 40] = "GET_SERVER",
            n[n.CONNECT_REDIRECT = 41] = "CONNECT_REDIRECT",
            n[n.CREATE_DEVICE = 42] = "CREATE_DEVICE",
            n[n.UPDATE_DEVICE = 43] = "UPDATE_DEVICE",
            n[n.DELETE_DEVICE = 44] = "DELETE_DEVICE",
            n[n.GET_DEVICES = 45] = "GET_DEVICES",
            n[n.CREATE_TAG = 46] = "CREATE_TAG",
            n[n.UPDATE_TAG = 47] = "UPDATE_TAG",
            n[n.DELETE_TAG = 48] = "DELETE_TAG",
            n[n.GET_TAGS = 49] = "GET_TAGS",
            n[n.APP_CONNECTED = 50] = "APP_CONNECTED",
            n[n.UPDATE_FACE = 51] = "UPDATE_FACE",
            n[n.EVENTOR = 53] = "EVENTOR",
            n[n.WEB_SOCKETS = 52] = "WEB_SOCKETS",
            n[n.WEB_HOOKS = 54] = "WEB_HOOKS",
            n[n.CREATE_APP = 55] = "CREATE_APP",
            n[n.UPDATE_APP = 56] = "UPDATE_APP",
            n[n.DELETE_APP = 57] = "DELETE_APP",
            n[n.GET_PROJECT_BY_TOKEN = 58] = "GET_PROJECT_BY_TOKEN",
            n[n.EMAIL_QR = 59] = "EMAIL_QR",
            n[n.GET_ENHANCED_GRAPH_DATA = 60] = "GET_ENHANCED_GRAPH_DATA",
            n[n.DELETE_ENHANCED_GRAPH_DATA = 61] = "DELETE_ENHANCED_GRAPH_DATA",
            n[n.GET_CLONE_CODE = 62] = "GET_CLONE_CODE",
            n[n.GET_PROJECT_BY_CLONE_CODE = 63] = "GET_PROJECT_BY_CLONE_CODE",
            n[n.HARDWARE_LOG_EVENT = 64] = "HARDWARE_LOG_EVENT",
            n[n.HARDWARE_RESEND_FROM_BLUETOOTH = 65] = "HARDWARE_RESEND_FROM_BLUETOOTH",
            n[n.LOGOUT = 66] = "LOGOUT",
            n[n.CREATE_TILE_TEMPLATE = 67] = "CREATE_TILE_TEMPLATE",
            n[n.UPDATE_TILE_TEMPLATE = 68] = "UPDATE_TILE_TEMPLATE",
            n[n.DELETE_TILE_TEMPLATE = 69] = "DELETE_TILE_TEMPLATE",
            n[n.GET_WIDGET = 70] = "GET_WIDGET",
            n[n.HARDWARE_DISCONNECTED = 71] = "HARDWARE_DISCONNECTED",
            n[n.HTTP_IS_HARDWARE_CONNECTED = 82] = "HTTP_IS_HARDWARE_CONNECTED",
            n[n.HTTP_IS_APP_CONNECTED = 83] = "HTTP_IS_APP_CONNECTED",
            n[n.HTTP_GET_PIN_DATA = 84] = "HTTP_GET_PIN_DATA",
            n[n.HTTP_UPDATE_PIN_DATA = 85] = "HTTP_UPDATE_PIN_DATA",
            n[n.HTTP_NOTIFY = 86] = "HTTP_NOTIFY",
            n[n.HTTP_EMAIL = 87] = "HTTP_EMAIL",
            n[n.HTTP_GET_PROJECT = 88] = "HTTP_GET_PROJECT",
            n[n.HTTP_QR = 89] = "HTTP_QR",
            n[n.HTTP_GET_HISTORY_DATA = 90] = "HTTP_GET_HISTORY_DATA",
            n[n.HTTP_START_OTA = 91] = "HTTP_START_OTA",
            n[n.HTTP_STOP_OTA = 92] = "HTTP_STOP_OTA",
            n[n.HTTP_CLONE = 93] = "HTTP_CLONE",
            n[n.HTTP_TOTAL = 94] = "HTTP_TOTAL",
            n[n.UPDATE_SUB = 120] = "UPDATE_SUB",
            n[n.UPDATE_ACCOUNT = 72] = "UPDATE_ACCOUNT",
            n[n.BAD_TYPE = 255] = "BAD_TYPE"
        }(e || (e = {}));
        var h, p = function() {
            function n() {}
            return n.from = function(n) {
                var l = n.toUpperCase();
                return l in e ? e[l] : e.BAD_TYPE
            }
            ,
            n.toString = function(n) {
                return n in e ? e[n] : "(unknown command " + n + ")"
            }
            ,
            n
        }();
        !function(n) {
            n[n.OK = 200] = "OK",
            n[n.QUOTA_LIMIT_EXCEPTION = 1] = "QUOTA_LIMIT_EXCEPTION",
            n[n.ILLEGAL_COMMAND = 2] = "ILLEGAL_COMMAND",
            n[n.USER_NOT_REGISTERED = 3] = "USER_NOT_REGISTERED",
            n[n.USER_ALREADY_REGISTERED = 4] = "USER_ALREADY_REGISTERED",
            n[n.USER_NOT_AUTHENTICATED = 5] = "USER_NOT_AUTHENTICATED",
            n[n.NOT_ALLOWED = 6] = "NOT_ALLOWED",
            n[n.DEVICE_NOT_IN_NETWORK = 7] = "DEVICE_NOT_IN_NETWORK",
            n[n.NO_ACTIVE_DASHBOARD = 8] = "NO_ACTIVE_DASHBOARD",
            n[n.INVALID_TOKEN = 9] = "INVALID_TOKEN",
            n[n.ILLEGAL_COMMAND_BODY = 11] = "ILLEGAL_COMMAND_BODY",
            n[n.GET_GRAPH_DATA_EXCEPTION = 12] = "GET_GRAPH_DATA_EXCEPTION",
            n[n.NOTIFICATION_INVALID_BODY_EXCEPTION = 13] = "NOTIFICATION_INVALID_BODY_EXCEPTION",
            n[n.NOTIFICATION_NOT_AUTHORIZED_EXCEPTION = 14] = "NOTIFICATION_NOT_AUTHORIZED_EXCEPTION",
            n[n.NOTIFICATION_EXCEPTION = 15] = "NOTIFICATION_EXCEPTION",
            n[n.BLYNK_TIMEOUT_EXCEPTION = 16] = "BLYNK_TIMEOUT_EXCEPTION",
            n[n.NO_DATA_EXCEPTION = 17] = "NO_DATA_EXCEPTION",
            n[n.DEVICE_WENT_OFFLINE = 18] = "DEVICE_WENT_OFFLINE",
            n[n.SERVER_EXCEPTION = 19] = "SERVER_EXCEPTION",
            n[n.NOT_SUPPORTED_VERSION = 20] = "NOT_SUPPORTED_VERSION",
            n[n.ENERGY_LIMIT = 21] = "ENERGY_LIMIT",
            n[n.FACEBOOK_USER_LOGIN_WITH_PASS = 22] = "FACEBOOK_USER_LOGIN_WITH_PASS",
            n[n.BAD_TYPE = 255] = "BAD_TYPE"
        }(h || (h = {}));
        var g = function() {
            function n() {}
            return n.from = function(n) {
                var l = n.toUpperCase();
                return l in h ? h[l] : h.BAD_TYPE
            }
            ,
            n.toString = function(n) {
                return n in h ? h[n] : "(unknown status " + n + ")"
            }
            ,
            n.displayString = function(l) {
                var t = n.toString(l);
                return t = t.charAt(0).toUpperCase() + t.substr(1).toLowerCase(),
                t = t.replace(/_/g, " ")
            }
            ,
            n
        }()
          , f = function() {
            function n(l) {
                if (this.commandCode = e.BAD_TYPE,
                this.id = 0,
                this.responseCode = h.OK,
                l instanceof ArrayBuffer) {
                    var t = new DataView(l);
                    if (this.commandCode = t.getInt8(0),
                    this.id = t.getUint16(1),
                    this.commandCode == e.RESPONSE)
                        this.responseCode = t.getUint16(3);
                    else if (this.commandCode == e.LOAD_PROFILE_GZIPPED || this.commandCode == e.GET_PROJECT_BY_TOKEN) {
                        var u = t.getUint16(3);
                        this.body = c.a.unzipSync(d.Buffer.from(l, 5, u)).toString()
                    } else if (this.commandCode == e.GET_ENHANCED_GRAPH_DATA) {
                        u = t.getUint16(3);
                        var i = c.a.unzipSync(d.Buffer.from(l, 5, u))
                          , o = 4;
                        for (this.graphBody = []; o < i.length; ) {
                            var a = []
                              , r = i.readInt32BE(o);
                            o += 4;
                            for (var s = 0; s < r; ) {
                                var g = i.readDoubleBE(o);
                                o += 8;
                                var f = new Date(i.readUIntBE(o + 2, 6));
                                o += 8,
                                a.push({
                                    y: g,
                                    t: f
                                }),
                                s += 1
                            }
                            this.graphBody.push(a)
                        }
                        for (this.body = this.graphBody.length + " series with points: ",
                        o = 0; o < this.graphBody.length; o += 1)
                            this.body += this.graphBody[o].length.toString() + " "
                    } else {
                        u = t.getUint16(3);
                        this.body = String.fromCharCode.apply(null, new Uint8Array(l.slice(5, 5 + u)))
                    }
                } else {
                    var _ = l.split(" ");
                    this.commandCode = p.from(_[0]),
                    this.id = n.getNextID(),
                    this.body = _.length > 1 ? _.slice(1).join(" ") : ""
                }
                this.parseDevice()
            }
            return n.getNextID = function() {
                var l = n.nextID;
                return ++n.nextID > 65535 && (n.nextID = 0),
                1111 == n.nextID && (n.nextID = 1112),
                l
            }
            ,
            n.prototype.parseDevice = function() {
                if (this.body && (this.parts = this.body.split("\0"),
                this.commandCode == e.HARDWARE || this.commandCode == e.HARDWARE_CONNECTED || this.commandCode == e.HARDWARE_DISCONNECTED || this.commandCode == e.APP_SYNC)) {
                    var n = this.parts[0].split("-");
                    this.deviceId = n.length > 1 ? Number.parseInt(n[1]) : 0
                }
            }
            ,
            n.prototype.parsePinMessage = function() {
                if (this.parts.length < 4 || "vw" != this.parts[1])
                    return {
                        pin: -1,
                        value: ""
                    };
                return {
                    pin: Number.parseInt(this.parts[2]),
                    value: this.parts.slice(3).join(" ")
                }
            }
            ,
            n.prototype.toString = function() {
                var n = p.toString(this.commandCode) + " @" + this.id;
                return n += this.commandCode == e.RESPONSE ? " = " + g.displayString(this.responseCode) : ": [" + this.body + "]"
            }
            ,
            n.prototype.toDisplayString = function() {
                var n = this.toString();
                return n = n.replace(/\0/g, "·")
            }
            ,
            n.prototype.expectResponse = function() {
                return this.commandCode != e.HARDWARE && this.commandCode != e.RESPONSE
            }
            ,
            n.prototype.displayResponse = function() {
                return g.displayString(this.responseCode)
            }
            ,
            n.prototype.serialize = function() {
                var n = new ArrayBuffer(5 + this.body.length)
                  , l = new DataView(n);
                if (l.setInt8(0, this.commandCode),
                l.setInt16(1, this.id),
                l.setInt16(3, this.body.length),
                this.body.length > 0)
                    for (var t = 0, e = 5; t < this.body.length; t++,
                    e++)
                        l.setInt8(e, this.body.charCodeAt(t));
                return new Uint8Array(n)
            }
            ,
            n.nextID = 1,
            n
        }()
          , _ = function() {
            return function(n, l, t) {
                void 0 === t && (t = ""),
                this.resolve = n,
                this.reject = l,
                this.metadata = t
            }
        }()
          , m = function() {
            function n() {
                this.queue = []
            }
            return n.prototype.newPromise = function() {
                var n = this;
                return new Promise(function(l, t) {
                    var e = new _(l,t);
                    n.queue.push(e)
                }
                )
            }
            ,
            n.prototype.resolveAll = function() {
                for (; this.queue && this.queue.length; )
                    this.queue.shift().resolve(!0)
            }
            ,
            n
        }()
          , v = function() {
            function n() {
                this.serverConnectedSource = new o.Subject,
                this.serverConnected$ = this.serverConnectedSource.asObservable(),
                this.connectPromises = new m,
                this.disconnectPromises = new m,
                this.hardwareActivitySource = new o.Subject,
                this.hardwareActivity$ = this.hardwareActivitySource.asObservable(),
                this.subscriptionChangeSource = new o.Subject,
                this.subscriptionChange$ = this.subscriptionChangeSource.asObservable(),
                this.persistent = !0,
                this.messagePromises = new Map,
                this.pinHandlers = new Map,
                this.currentPins = new Map
            }
            return n.prototype.isDisconnected = function() {
                return !this.ws || this.ws.readyState == WebSocket.CLOSED || this.ws.readyState == WebSocket.CLOSING
            }
            ,
            n.prototype.isConnected = function() {
                return this.ws && this.ws.readyState == WebSocket.OPEN
            }
            ,
            n.prototype.waitForConnect = function() {
                return this.isConnected() ? Promise.resolve(!0) : this.connectPromises.newPromise()
            }
            ,
            n.prototype.waitForDisconnect = function() {
                return this.isDisconnected() ? Promise.resolve(!0) : this.disconnectPromises.newPromise()
            }
            ,
            n.prototype.initWebSocket = function(n, l, t) {
                var e = this;
                return void 0 === t && (t = !0),
                new Promise(function(u, i) {
                    if (e.ws) {
                        if (e.ws.readyState == WebSocket.CONNECTING)
                            return e.waitForConnect();
                        if (e.ws.readyState == WebSocket.OPEN)
                            return console.log("Tried to connect but already connected."),
                            u(!0)
                    }
                    console.log("WS CONNECTING"),
                    e.rejectAllMessagePromises();
                    var o = t ? "wss" : "ws";
                    e.ws = new WebSocket(o + "://" + n + ":" + l + "/websocket"),
                    e.ws.onopen = function(n) {
                        e.onOpen(n),
                        u(!0)
                    }
                    ,
                    e.ws.onerror = function(n) {
                        e.onError(n),
                        i("Couldn't connect to server.")
                    }
                    ,
                    e.ws.onclose = function(n) {
                        return e.onClose(n)
                    }
                    ,
                    e.ws.onmessage = function(n) {
                        return e.onMessage(n)
                    }
                }
                )
            }
            ,
            n.prototype.breakSocket = function() {
                this.ws.close()
            }
            ,
            n.prototype.onOpen = function(n) {
                console.log("WS CONNECTED"),
                this.serverConnectedSource.next(!0),
                this.connectPromises.resolveAll()
            }
            ,
            n.prototype.onClose = function(n) {
                console.log("WS DISCONNECTED"),
                this.serverConnectedSource.next(!1),
                this.disconnectPromises.resolveAll()
            }
            ,
            n.prototype.onError = function(n) {
                console.log("WS ERROR: " + (n.data ? n.data : "no explanation"))
            }
            ,
            n.prototype.rejectAllMessagePromises = function() {
                this.messagePromises.size && (console.log("Clearing pending messages:"),
                this.messagePromises.forEach(function(n) {
                    n.forEach(function(n) {
                        try {
                            n.reject("Connection closed.")
                        } catch (n) {}
                    })
                }),
                this.messagePromises = new Map)
            }
            ,
            n.prototype.findMessageId = function(n) {
                for (var l = 0, t = Array.from(this.messagePromises.entries()); l < t.length; l++) {
                    var e = t[l]
                      , u = e[1];
                    if (u && u[0] && u[0].metadata == n)
                        return e[0]
                }
            }
            ,
            n.prototype.doSend = function(n, l) {
                var t = this;
                return void 0 === l && (l = !0),
                new Promise(function(e, u) {
                    var i = new _(e,u,n)
                      , o = void 0;
                    if (l && (o = t.findMessageId(n)),
                    !l || void 0 === o) {
                        var a = new f(n);
                        return a.expectResponse() && t.messagePromises.set(a.id, [i]),
                        console.log("WS SENDING: " + a.toDisplayString()),
                        t.isDisconnected() ? i.reject(new Error("WebSocket is disconnected.")) : t.waitForConnect().then(function() {
                            return t.ws.send(a.serialize()),
                            a.expectResponse() || i.resolve(a),
                            i
                        })
                    }
                    var r = t.messagePromises.get(o);
                    r.push(i),
                    t.messagePromises.set(o, r),
                    console.log("PIGGYBACK @" + o + ": " + n)
                }
                )
            }
            ,
            n.prototype.onMessage = function(n) {
                var l = this;
                if (n.data instanceof Blob) {
                    var t = new FileReader;
                    t.addEventListener("loadend", function(n) {
                        t.result ? l.handleMessage(t.result) : console.log("WS RECEIVED: empty message")
                    }),
                    t.readAsArrayBuffer(n.data)
                } else
                    n.data instanceof ArrayBuffer && this.handleMessage(n.data)
            }
            ,
            n.prototype.handleMessage = function(n) {
                var l = new f(n);
                if (console.log("WS RECEIVED: " + l.toDisplayString()),
                this.messagePromises.has(l.id)) {
                    var t = this.messagePromises.get(l.id);
                    this.messagePromises.delete(l.id);
                    for (var u = 0, i = t; u < i.length; u++) {
                        var o = i[u];
                        l.commandCode == e.RESPONSE && l.responseCode != h.OK ? o.reject(l.displayResponse()) : o.resolve(l)
                    }
                }
                l.commandCode != e.HARDWARE && l.commandCode != e.HARDWARE_CONNECTED || this.setHardwareConnected(l.deviceId, !0),
                l.commandCode == e.RESPONSE && l.responseCode == h.DEVICE_WENT_OFFLINE && this.setHardwareConnected(l.deviceId, !1),
                l.commandCode == e.HARDWARE_DISCONNECTED && this.setHardwareConnected(l.deviceId, !1),
                l.commandCode != e.APP_SYNC && l.commandCode != e.HARDWARE || this.processPinMessage(l),
                l.commandCode == e.UPDATE_SUB && this.processUpdateSubMessage(l.body)
            }
            ,
            n.prototype.setHardwareConnected = function(n, l) {
                this.hardwareActivitySource.next({
                    deviceId: n,
                    active: l
                })
            }
            ,
            n.prototype.pinName = function(n, l) {
                return String(n) + "-v" + l
            }
            ,
            n.prototype.onPin = function(n, l, t) {
                var e = this.pinName(n, l);
                this.pinHandlers.has(e) ? this.pinHandlers.set(e, this.pinHandlers.get(e).concat([t])) : this.pinHandlers.set(e, [t])
            }
            ,
            n.prototype.isHandlingPin = function(n, l) {
                var t = this.pinName(n, l);
                return this.pinHandlers.has(t)
            }
            ,
            n.prototype.clearPinHandlers = function(n) {
                var l = String(n) + "-";
                this.pinHandlers.forEach(function(n, t, e) {
                    t.startsWith(l) && e.delete(t)
                })
            }
            ,
            n.prototype.clearDevicePinHandlers = function() {
                this.pinHandlers.forEach(function(n, l, t) {
                    l.startsWith("*-") || t.delete(l)
                })
            }
            ,
            n.prototype.clearPinCache = function(n, l) {
                void 0 === n && (n = void 0),
                void 0 === l && (l = void 0),
                void 0 == n && void 0 === l ? this.currentPins = new Map : this.currentPins.delete(this.pinName(n, l))
            }
            ,
            n.prototype.processPinMessage = function(n) {
                var l = n.parsePinMessage();
                l.pin < 0 || this.updatePinValue(n.deviceId, l.pin, l.value)
            }
            ,
            n.prototype.updatePinValue = function(n, l, t) {
                var e = this.pinName(n, l)
                  , u = this.currentPins[e];
                if (l == 1) {
                    console.log("FIN TEMP: ", t)
                }
                this.currentPins[e] = t,
                this.firePinHandlers(e, n, l, u, t),
                this.firePinHandlers(this.pinName("*", l), n, l, u, t)
            }
            ,
            n.prototype.firePinHandlers = function(n, l, t, e, u) {
                if (this.pinHandlers.has(n))
                    for (var i = 0, o = this.pinHandlers.get(n); i < o.length; i++) {
                        this.firePinHandler(o[i], u, e, l)
                    }
            }
            ,
            n.prototype.firePinHandler = function(n, l, t, e) {
                n(l, t, e)
            }
            ,
            n.prototype.processUpdateSubMessage = function(n) {
                try {
                    (n = JSON.parse(n)).metadata && (n.metadata = JSON.parse(n.metadata))
                } catch (l) {
                    n.metadata = void 0,
                    console.log("Couldn't parse subscription metadata: ", l)
                }
                this.updateCurrentSub(n),
                this.subscriptionChangeSource.next(n)
            }
            ,
            n.prototype.updateCurrentSub = function(n) {}
            ,
            n
        }()
          , b = t(490)
          , y = t.n(b);
        t.d(l, "a", function() {
            return w
        });
        var C = function() {
            function n(n) {
                this.duration = n
            }
            return n.prototype.add = function(n) {
                this.timer && clearTimeout(this.timer),
                this.timer = setTimeout(n, this.duration)
            }
            ,
            n
        }()
          , w = function(n) {
            function l(l, t, e) {
                var u = n.call(this) || this;
                return u.http = l,
                u.settings = t,
                u.appCtrl = e,
                u.didLogin = !1,
                u._devices = [],
                u.profileIsDirty = !1,
                u.pinDefaults = {},
                u.accountLoggedInSource = new o.Subject,
                u.accountLoggedIn$ = u.accountLoggedInSource.asObservable(),
                u.tweakWrite = new C(750),
                u
            }
            return Object(u.__extends)(l, n),
            Object.defineProperty(l.prototype, "server", {
                get: function() {
                    return this._server
                },
                set: function(n) {
                    this._server = n
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(l.prototype, "account", {
                get: function() {
                    return this._account
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(l.prototype, "passwordHash", {
                get: function() {
                    return this._passwordHash
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(l.prototype, "deviceToken", {
                get: function() {
                    return this._deviceToken
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(l.prototype, "devices", {
                get: function() {
                    return this._devices
                },
                enumerable: !0,
                configurable: !0
            }),
            l.prototype.isHardwareSecure = function() {
                return this.secureHardware
            }
            ,
            l.prototype.hardwareHost = function() {
                return this.isHardwareSecure() ? this.secureHardwareHost : this.insecureHardwareHost
            }
            ,
            l.prototype.hardwareHostPort = function() {
                return this.isHardwareSecure() ? this.secureHardwareHostPort : this.insecureHardwareHostPort
            }
            ,
            l.prototype.setCredentials = function(n, l, t) {
                void 0 === t && (t = void 0),
                this._account = n.toLowerCase(),
                this._passwordHash = l,
                this._masqueradeUser = t,
                this._masqueradeFromUser = this._account,
                this._masqueradeFromPasswordHash = this._passwordHash
            }
            ,
            l.prototype.clearSession = function() {
                this.appProject = void 0,
                this.profile = void 0,
                this.liveProject = void 0,
                this.profileIsDirty = !1,
                this.didLogin = !1,
                this._devices = [],
                this.clearPinCache(),
                this.clearDevicePinHandlers()
            }
            ,
            l.prototype.hashPassword = function(n, l) {
                var t = y.a.algo.SHA256.create();
                t.update(l.toLowerCase());
                var e = t.finalize();
                return (t = y.a.algo.SHA256.create()).update(n),
                t.update(e),
                t.finalize().toString(y.a.enc.Base64)
            }
            ,
            l.prototype.serverPort = function() {
                return this.secure ? this.wssPort : this.wsPort
            }
            ,
            l.prototype.serverUrl = function() {
                return (this.secure ? "https:" : "http:") + "//" + this._server
            }
            ,
            l.prototype.connect = function() {
                return this._server && this.serverPort() && this.canLogIn() && this.isDisconnected() ? this.initWebSocket(this._server, this.serverPort(), this.secure) : Promise.resolve(!0)
            }
            ,
            l.prototype.connectIfNeeded = function() {
                return this.isDisconnected() ? this.connect() : this.waitForConnect()
            }
            ,
            l.prototype.isLoggedIn = function() {
                return !this.isDisconnected() && this.didLogin
            }
            ,
            l.prototype.isDead = function() {
                return this.isDisconnected() && this.didLogin
            }
            ,
            l.prototype.canLogIn = function() {
                return "" != this._account && "" != this._passwordHash || "" != this._masqueradeFromUser && "" != this._masqueradeFromPasswordHash
            }
            ,
            l.prototype.createDevice = function(n) {}
            ,
            l.prototype.deviceById = function(n) {
                return r.a.find(this._devices, {
                    id: n
                })
            }
            ,
            l.prototype.updateDevices = function() {
                var n = this;
                return this.getDevices().then(function(l) {
                    return console.log("updateDevices(", l, ") vs. ", n._devices),
                    n.updateArray(l, n._devices, function(l) {
                        return n.createDevice(l)
                    }, function(n, l) {
                        return l.update(n)
                    }),
                    console.log("  updateDevices result:", n._devices),
                    n._devices
                })
            }
            ,
            l.prototype.updateArray = function(n, l, t, e) {
                void 0 === t && (t = function(n) {
                    return n
                }
                ),
                void 0 === e && (e = function(n, l) {}
                ),
                l.splice(n.length);
                for (var u in n)
                    Number(u) >= l.length ? l.push(t(n[u])) : e(n[u], l[u])
            }
            ,
            l.prototype.doLogin = function() {
                var n = this;
                if (this.isLoggedIn())
                    return Promise.resolve(!0);
                this.clearSession();
                var l = this.appVersion.replace(/\./g, "");
                l = r.a.padEnd(l, 8, 0),
                !this._passwordHash && this._masqueradeFromUser && (this._masqueradeUser = this._account,
                this._account = this._masqueradeFromUser,
                this._passwordHash = this._masqueradeFromPasswordHash);
                var t = "login " + this._account + "\0" + this._passwordHash + "\0Other\0" + l + "\0Blynk";
                return this._masqueradeUser && (t += "\0" + this._masqueradeUser),
                console.log("BlynkProvider.doLogin()"),
                this.connectIfNeeded().then(function() {
                    return n.doSend(t)
                }).then(function(l) {
                    n.didLogin = !0,
                    n._masqueradeUser && (n._account = n._masqueradeUser,
                    n._passwordHash = void 0,
                    n._masqueradeUser = void 0)
                }).then(function() {
                    return n.accountLoggedInSource.next(!0)
                })
            }
            ,
            l.prototype.doLoginAndReload = function() {
                var n = this;
                return this.doLogin().then(function() {
                    return n.connectToProject()
                }).then(function(l) {
                    return n.appSync()
                })
            }
            ,
            l.prototype.doRegister = function() {
                var n = this;
                return this.connect().then(function() {
                    return n.doSend("register " + n._account + "\0" + n._passwordHash)
                })
            }
            ,
            l.prototype.doLogout = function(n) {
                var l = this;
                return void 0 === n && (n = !0),
                this.clearSession(),
                this._passwordHash = void 0,
                this.isDisconnected() ? this.waitForDisconnect().then(function() {
                    return l.finishLogout(n)
                }) : this.doSend("logout").then(function() {
                    return l.waitForDisconnect()
                }).then(function() {
                    return l.finishLogout(n)
                })
            }
            ,
            l.prototype.finishLogout = function(n) {
                return void 0 === n && (n = !0),
                n && (this.settings.setValue("passwordHash", ""),
                this.appCtrl.getRootNavs()[0].setRoot("LoginPage")),
                this.accountLoggedInSource.next(!1),
                !0
            }
            ,
            l.prototype.resetPassword = function(n) {
                var l = this
                  , t = (this.secure ? "https:" : "http:") + "//" + this._server + ":" + this.serverPort() + "/resetPassword";
                return new Promise(function(e, u) {
                    var o = "appname=Blynk&email=" + encodeURIComponent(n)
                      , a = {
                        headers: new i.g({
                            "Content-Type": "application/x-www-form-urlencoded"
                        })
                    };
                    return l.http.post(t, o, a).toPromise().catch(function(n) {
                        200 == n.status ? e(!0) : u(0 == n.status ? "Couldn't connect" : n.error)
                    })
                }
                )
            }
            ,
            l.prototype.doCommand = function(n) {
                var l = this;
                return this.ensureConnected().then(function() {
                    return l.doSend(n)
                })
            }
            ,
            l.prototype.getProfile = function() {
                var n = this;
                return this.profile ? Promise.resolve(this.profile) : (console.log("BlynkProvider.getProfile()"),
                this.doLogin().then(function() {
                    return n.profile ? Promise.resolve(n.profile) : n.doSend("load_profile_gzipped").then(function(l) {
                        if (n.profile = JSON.parse(l.body),
                        n.profileIsDirty = !1,
                        !n.profile)
                            throw new Error("Can't load profile from JSON");
                        if (n.profile.subscription && n.profile.subscription.metadata)
                            try {
                                n.profile.subscription.metadata = JSON.parse(n.profile.subscription.metadata)
                            } catch (l) {
                                n.profile.subscription.metadata = void 0
                            }
                        return n.updateDevices(),
                        n.profile
                    })
                }))
            }
            ,
            l.prototype.updateCurrentSub = function(n) {
                this.profile && (this.profile.subscription = n)
            }
            ,
            l.prototype.dataStartDate = function() {
                return new Date(2017,6,1)
            }
            ,
            l.prototype.invalidateProfileCache = function() {
                this.profile = void 0
            }
            ,
            l.prototype.getAppProject = function() {
                var n = this;
                return this.appProject ? Promise.resolve(this.appProject) : this.doCommand("get_project_by_token " + this.appToken).then(function(l) {
                    return n.appProject = JSON.parse(l.body),
                    n.appProject.pinsStorage = {},
                    n.appProject
                })
            }
            ,
            l.prototype.findProject = function() {
                var n = this;
                return this.getProfile().then(function(l) {
                    return n.getAppProject()
                }).then(function(l) {
                    var t, e = r.a.find(n.profile.dashBoards, ["id", l.parentId]), u = r.a.find(n.profile.dashBoards, ["id", l.id]);
                    return e ? t = e : u && (t = u),
                    n.liveProject = t,
                    t
                })
            }
            ,
            l.prototype.isDeveloper = function() {
                var n = this;
                return this.getAppProject().then(function(l) {
                    return n.getProfile().then(function(n) {
                        return void 0 != r.a.find(n.dashBoards, ["id", l.parentId])
                    })
                })
            }
            ,
            l.prototype.createProject = function() {
                var n = this;
                return this.getAppProject().then(function(l) {
                    return l ? (l.devices[0].name = n.appName,
                    n.tweakProject(null, l).then(function(l) {
                        return n.doSend("create_dash " + JSON.stringify(l))
                    })) : void 0
                }).then(function() {
                    return n.invalidateProfileCache(),
                    n.findProject()
                }).then(function(n) {
                    if (n)
                        return n;
                    throw new Error("Server created project but it doesn't exist.")
                })
            }
            ,
            l.prototype.createNewDevice = function() {
                var n = this;
                return this.getAppProject().then(function(l) {
                    return n.findProject().then(function(t) {
                        var e = l.devices[0]
                          , u = r.a.maxBy(t.devices, function(n) {
                            return n.id
                        }).id + 1
                          , i = e;
                        return i.id = u,
                        i.name = n.appName + " " + (u + 1),
                        n.invalidateProfileCache(),
                        n.doSend("create_device " + t.id + "\0" + JSON.stringify(i)).then(function(n) {
                            return JSON.parse(n.body)
                        })
                    })
                })
            }
            ,
            l.prototype.deleteDevice = function(n) {
                var l = this;
                return this.findProject().then(function(t) {
                    return l.invalidateProfileCache(),
                    l.doSend("delete_device " + t.id + "\0" + n).then(function(t) {
                        return l.clearPinHandlers(n),
                        t
                    })
                })
            }
            ,
            l.prototype.findWidget = function(n, l) {
                return n && "widgets"in n ? r.a.find(n.widgets, ["label", l]) : null
            }
            ,
            l.prototype.findWidgetType = function(n, l) {
                return n && "widgets"in n ? r.a.find(n.widgets, ["type", l]) : null
            }
            ,
            l.prototype.findWidgetTypeForDevice = function(n, l, t) {
                return n && "widgets"in n ? r.a.find(n.widgets, {
                    type: l,
                    deviceId: t
                }) : null
            }
            ,
            l.prototype.findWidgetTypeAndPinForDevice = function(n, l, t, e) {
                return n && "widgets"in n ? void 0 === t ? this.findWidgetTypeForDevice(n, l, e) : r.a.find(n.widgets, {
                    type: l,
                    pin: t,
                    deviceId: e
                }) : null
            }
            ,
            l.prototype.listWidgetsByType = function(n, l) {
                return r.a.filter(n.widgets, {
                    type: l
                })
            }
            ,
            l.prototype.findUnusedWidgetId = function(n) {
                for (var l = 10; r.a.find(n.widgets, {
                    id: l
                }); )
                    l += 1;
                return l
            }
            ,
            l.prototype.getProjectVersion = function(n) {
                var l = this.findWidget(n, "project");
                return l && "value"in l ? l.value : 0
            }
            ,
            l.prototype.isAppProjectUpdated = function(n) {
                var l = Number(this.getProjectVersion(n))
                  , t = Number(this.getProjectVersion(this.appProject));
                return t > l && (console.log("App project version (" + t + ") is newer than user's project (" + l + ")"),
                !0)
            }
            ,
            l.prototype.maybeUpdateProject = function() {
                var n = this;
                return this.findProject().then(function(l) {
                    return l.id == n.appProject.id && n.isAppProjectUpdated(l) ? n.tweakProject(l, n.appProject).then(function(l) {
                        return n.editProject(JSON.stringify(l))
                    }).then(function(l) {
                        return n.setPinDefaults()
                    }).then(function(n) {
                        return !0
                    }) : n.setPinDefaults()
                })
            }
            ,
            l.prototype.setPinDefaults = function() {
                var n = this;
                return this.findProject().then(function(l) {
                    return l ? (l.pinsStorage || (l.pinsStorage = {}),
                    n.setPinDefaultsInProject(l)) : Promise.resolve(!1)
                })
            }
            ,
            l.prototype.setPinDefaultsInProject = function(n) {
                var l = this;
                return Promise.all(r.a.map(n.devices, function(t) {
                    return Promise.all(r.a.map(l.pinDefaults, function(e, u) {
                        var i = l.pinName(t.id, u);
                        return i in n.pinsStorage || (console.log("setPinDefaults: pin", i, "=", e),
                        n.pinsStorage[i] = e,
                        !0)
                    }))
                })).then(function() {
                    return !0
                })
            }
            ,
            l.prototype.tweakProject = function(n, l) {
                if (n && l) {
                    var t = l.widgets
                      , e = n.widgets;
                    if (t && e)
                        for (var u = 0, i = t; u < i.length; u++) {
                            var o = i[u];
                            if ("project" != o.label) {
                                var a = r.a.find(e, ["id", o.id]);
                                a && void 0 !== a.value && (o.value = a.value)
                            }
                        }
                }
                return this.setPinDefaultsInProject(l).then(function() {
                    return l
                })
            }
            ,
            l.prototype.cleanProject = function(n) {
                return Promise.resolve(n)
            }
            ,
            l.prototype.editProject = function(n) {
                var l = this;
                return this.invalidateProfileCache(),
                this.clearPinCache(),
                this.doCommand("update_dash " + n).then(function(n) {
                    return l.profileIsDirty = !1,
                    n
                })
            }
            ,
            l.prototype.tweakAndSaveProject = function() {
                var n = this;
                return this.findProject().then(function(l) {
                    return n.tweakProject(l, l)
                }).then(function(l) {
                    return n.editProject(JSON.stringify(l))
                })
            }
            ,
            l.prototype.tweakAndSaveProjectSoon = function() {
                var n = this;
                this.profileIsDirty = !0,
                this.tweakWrite.add(function() {
                    return n.tweakAndSaveProject()
                })
            }
            ,
            l.prototype.isProfileDirty = function() {
                return this.profileIsDirty
            }
            ,
            l.prototype.activateProject = function() {
                var n = this;
                return this.findProject().then(function(l) {
                    return n.invalidateProfileCache(),
                    n.doSend("activate_dashboard " + l.id)
                }).then(function() {
                    return n.appSync()
                })
            }
            ,
            l.prototype.connectToProject = function() {
                var n = this;
                return this.findProject().then(function(l) {
                    return l ? n.maybeUpdateProject().then(function(l) {
                        return n.findProject()
                    }) : n.createProject()
                })
            }
            ,
            l.prototype.getAccountMetadata = function() {
                var n = this;
                return this.getProfile().then(function(l) {
                    return n.getCachedAccountMetadata()
                })
            }
            ,
            l.prototype.getCachedAccountMetadata = function() {
                return this.profile.account ? JSON.parse(this.profile.account) : {}
            }
            ,
            l.prototype.setAccountMetadata = function(n) {
                var l = this;
                return this.doCommand("update_account " + JSON.stringify(n)).then(function() {
                    return l.profile && (l.profile.account = JSON.stringify(n)),
                    n
                })
            }
            ,
            l.prototype.updateAccountMetadata = function(n, l) {
                var t = this;
                return void 0 === l && (l = !0),
                this.getAccountMetadata().then(function(e) {
                    if (r.a.isMatch(e, n))
                        return !1;
                    var u = r.a.merge(r.a.cloneDeep(e), n);
                    return JSON.stringify(u) != JSON.stringify(e) && t.setAccountMetadata(u).then(function() {
                        return l && t.tweakAndSaveProjectSoon(),
                        !0
                    })
                })
            }
            ,
            l.prototype.getDevices = function() {
                return this.findProject().then(function(n) {
                    return n ? n.devices : []
                })
            }
            ,
            l.prototype.getFirstDevice = function() {
                return this.getDevices().then(function(n) {
                    return n[0]
                })
            }
            ,
            l.prototype.renameDevice = function(n, l) {
                var t = this;
                return l.length > 50 ? Promise.reject("The new device name is too long.") : (console.log("Changing device " + n + "'s name to: " + l),
                this.ensureConnected().then(function(n) {
                    return t.findProject()
                }).then(function(e) {
                    return t.getDevices().then(function(u) {
                        var i = r.a.find(u, function(l) {
                            return l.id == n
                        });
                        return i ? (i.name = l,
                        t.invalidateProfileCache(),
                        t.doSend("update_device " + e.id + "\0" + JSON.stringify(i)).then(function(n) {
                            return t.getDevices(),
                            !0
                        })) : Promise.reject("Device doesn't exist.")
                    })
                }))
            }
            ,
            l.prototype.refreshToken = function(n) {
                var l = this;
                return this.ensureConnected().then(function(n) {
                    return l.findProject()
                }).then(function(t) {
                    return l.doSend("refresh_token " + t.id + "\0" + n)
                }).then(function(n) {
                    return n.body
                })
            }
            ,
            l.prototype.appSync = function(n) {
                var l = this;
                void 0 === n && (n = -1);
                var t = -1 == n ? "" : "-" + n;
                return this.findProject().then(function(n) {
                    return l.doSend("app_sync " + n.id + t)
                }).then(function(n) {
                    return Promise.resolve(!0)
                }).catch(function(n) {
                    return l.showError("There was a problem talking to the server: " + n),
                    l.breakSocket(),
                    Promise.reject(n)
                })
            }
            ,
            l.prototype.ensureConnected = function() {
                return this.isLoggedIn() ? Promise.resolve(!0) : this.doLoginAndReload().then(function(n) {
                    return Promise.resolve(!0)
                })
            }
            ,
            l.prototype.getPin = function(n, l) {
                var t = this;
                return this.ensureConnected().then(function(n) {
                    return t.findProject()
                }).then(function(e) {
                    return t.doSend("hardware " + e.id + "-" + n + "\0vr\0" + l)
                }).then(function(n) {
                    var l = n.parsePinMessage();
                    return Promise.resolve(l.value)
                }).catch(function(e) {
                    return Promise.resolve(t.getCachedPin(n, l))
                })
            }
            ,
            l.prototype.getCachedPin = function(n, l, t) {
                void 0 === t && (t = null);
                var e = this.pinName(n, l);
                return e in this.currentPins && void 0 !== this.currentPins[e] ? this.currentPins[e] : this.getProjectPin(n, l, t)
            }
            ,
            l.prototype.getCachedPinFlag = function(n, l, t) {
                return void 0 === t && (t = null),
                "1" == this.getCachedPin(n, l, t)
            }
            ,
            l.prototype.getProjectPin = function(n, l, t) {
                void 0 === t && (t = null);
                var e = this.pinName(n, l);
                null == t && (t = this.liveProject);
                var u;
                return t && t.pinsStorage && (u = t.pinsStorage[e]),
                void 0 === u && (u = this.pinDefaults[l]),
                u
            }
            ,
            l.prototype.getLazyPin = function(n, l) {
                return this.getCachedPin(n, l) ? Promise.resolve(this.getCachedPin(n, l)) : this.getPin(n, l)
            }
            ,
            l.prototype.trackPin = function(n, l, t) {
                this.onPin(n, l, t);
                var e = this.getCachedPin(n, l);
                void 0 !== e && this.firePinHandler(t, e, void 0, n)
            }
            ,
            l.prototype.setPin = function(n, l, t, e) {
                var u = this;
                return void 0 === e && (e = !0),
                typeof t == typeof !0 && (t = t ? "1" : "0"),
                this.ensureConnected().then(function(n) {
                    return u.findProject()
                }).then(function(i) {
                    return u.doSend("hardware " + i.id + "-" + n + "\0vw\0" + l + "\0" + t, e),
                    u.updatePinValue(n, l, t.toString()),
                    !0
                })
            }
            ,
            l.prototype.getGraphData = function(n, l, t, e) {
                var u = this;
                return void 0 === t && (t = 0),
                void 0 === e && (e = -1),
                this.ensureConnected().then(function(n) {
                    return u.findProject()
                }).then(function(i) {
                    return u.doSend("get_enhanced_graph_data " + i.id + (e >= 0 ? "-" + String(e) : "") + "\0" + n + "\0" + l.toUpperCase() + (t ? "\0" + t : ""))
                }).then(function(n) {
                    return Promise.resolve(n.graphBody)
                })
            }
            ,
            l
        }(v)
    },
    150: function(n, l, t) {
        "use strict";
        t.d(l, "a", function() {
            return e
        });
        t(3);
        var e = function() {
            function n(n) {
                this.blynk = n
            }
            return n.prototype.ionViewDidEnter = function() {
                this.blynk.persistent = !0,
                this.devices.forEach(function(n) {
                    n.reInitIfChanged() || n.updateBasicSettings()
                })
            }
            ,
            n
        }()
    },
    151: function(n, l, t) {
        "use strict";
        function e(n) {
            return i._19(0, [(n()(),
            i.Z(0, 0, null, null, 40, "ion-navbar", [["class", "toolbar"]], [[8, "hidden", 0], [2, "statusbar-padding", null]], null, null, s.b, s.a)), i.Y(1, 49152, null, 0, c.a, [d.a, [2, r.a], [2, h.a], a.a, i.j, i.z], null, null), (n()(),
            i._18(-1, 3, ["\n  "])), (n()(),
            i.Z(3, 0, null, 3, 36, "ion-grid", [["class", "grid"]], null, null, null, null, null)), i.Y(4, 16384, null, 0, p.a, [], null, null), (n()(),
            i._18(-1, null, ["\n    "])), (n()(),
            i.Z(6, 0, null, null, 32, "ion-row", [["align-items-center", ""], ["class", "row"]], null, null, null, null, null)), i.Y(7, 16384, null, 0, g.a, [], null, null), (n()(),
            i._18(-1, null, ["\n      "])), (n()(),
            i.Z(9, 0, null, null, 5, "ion-col", [["class", "col"], ["col-lg-6", ""], ["col-md-7", ""], ["offset-lg-3", ""], ["offset-md-2", ""]], null, null, null, null, null)), i.Y(10, 16384, null, 0, f.a, [], null, null), (n()(),
            i._18(-1, null, ["\n        "])), (n()(),
            i.Z(12, 0, null, null, 1, "h2", [], null, null, null, null, null)), (n()(),
            i._18(13, null, ["", ""])), (n()(),
            i._18(-1, null, ["\n      "])), (n()(),
            i._18(-1, null, ["\n      "])), (n()(),
            i.Z(16, 0, null, null, 7, "ion-col", [["class", "col"], ["col-auto", ""]], null, null, null, null, null)), i.Y(17, 16384, null, 0, f.a, [], null, null), (n()(),
            i._18(-1, null, ["\n        "])), (n()(),
            i.Z(19, 0, null, null, 3, "a", [["href", "https://www.storeitcold.com/support"], ["target", "_blank"]], null, null, null, null, null)), (n()(),
            i._18(-1, null, ["\n          "])), (n()(),
            i.Z(21, 0, null, null, 0, "img", [["class", "logo"], ["height", "28"], ["src", "assets/registered-logo.png"]], null, null, null, null, null)), (n()(),
            i._18(-1, null, ["\n        "])), (n()(),
            i._18(-1, null, ["\n      "])), (n()(),
            i._18(-1, null, ["\n      "])), (n()(),
            i.Z(25, 0, null, null, 12, "ion-col", [["class", "col"], ["col-auto", ""], ["no-padding", ""]], null, null, null, null, null)), i.Y(26, 16384, null, 0, f.a, [], null, null), (n()(),
            i._18(-1, null, ["\n        "])), (n()(),
            i.Z(28, 0, null, null, 8, "button", [["icon-only", ""], ["ion-button", ""], ["menuToggle", "right"]], [[8, "hidden", 0]], [[null, "click"]], function(n, l, t) {
                var e = !0;
                if ("click" === l) {
                    e = !1 !== i._13(n, 30).toggle() && e
                }
                return e
            }, _.b, _.a)), i.Y(29, 1097728, [[1, 4]], 0, m.a, [[8, ""], a.a, i.j, i.z], null, null), i.Y(30, 1064960, null, 0, v.a, [b.a, [2, r.a], [2, m.a], [2, c.a]], {
                menuToggle: [0, "menuToggle"]
            }, null), i.Y(31, 16384, null, 1, y.a, [a.a, i.j, i.z, [2, C.a], [2, c.a]], null, null), i._16(603979776, 1, {
                _buttons: 1
            }), (n()(),
            i._18(-1, 0, ["\n          "])), (n()(),
            i.Z(34, 0, null, 0, 1, "ion-icon", [["name", "menu"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), i.Y(35, 147456, null, 0, w.a, [a.a, i.j, i.z], {
                name: [0, "name"]
            }, null), (n()(),
            i._18(-1, 0, ["\n        "])), (n()(),
            i._18(-1, null, ["\n      "])), (n()(),
            i._18(-1, null, ["\n    "])), (n()(),
            i._18(-1, null, ["\n  "])), (n()(),
            i._18(-1, 3, ["\n"])), (n()(),
            i._18(-1, null, ["\n"]))], function(n, l) {
                n(l, 30, 0, "right");
                n(l, 35, 0, "menu")
            }, function(n, l) {
                var t = l.component;
                n(l, 0, 0, i._13(l, 1)._hidden, i._13(l, 1)._sbPadding);
                n(l, 13, 0, t.text);
                n(l, 28, 0, i._13(l, 30).isHidden);
                n(l, 34, 0, i._13(l, 35)._hidden)
            })
        }
        function u(n) {
            return i._19(0, [(n()(),
            i.Z(0, 0, null, null, 5, "ion-header", [], null, null, null, null, null)), i.Y(1, 16384, null, 0, o.a, [a.a, i.j, i.z, [2, r.a]], null, null), (n()(),
            i._18(-1, null, ["\n  "])), (n()(),
            i.Z(3, 0, null, null, 1, "cool-header", [], null, null, null, e, P)), i.Y(4, 49152, null, 0, k.a, [], {
                text: [0, "text"]
            }, null), (n()(),
            i._18(-1, null, ["\n"])), (n()(),
            i._18(-1, null, ["\n\n"])), (n()(),
            i.Z(7, 0, null, null, 16, "ion-content", [["padding", ""]], [[2, "statusbar-padding", null], [2, "has-refresher", null]], null, null, S.b, S.a)), i.Y(8, 4374528, null, 0, T.a, [a.a, E.a, Y.a, i.j, i.z, d.a, I.a, i.u, [2, r.a], [2, h.a]], null, null), (n()(),
            i._18(-1, 1, ["\n  "])), (n()(),
            i.Z(10, 0, null, 1, 12, "ion-grid", [["class", "grid"], ["no-padding", ""]], null, null, null, null, null)), i.Y(11, 16384, null, 0, p.a, [], null, null), (n()(),
            i._18(-1, null, ["\n    "])), (n()(),
            i.Z(13, 0, null, null, 8, "ion-row", [["class", "row"]], null, null, null, null, null)), i.Y(14, 16384, null, 0, g.a, [], null, null), (n()(),
            i._18(-1, null, ["\n      "])), (n()(),
            i.Z(16, 0, null, null, 4, "ion-col", [["class", "col"], ["col-lg-6", ""], ["col-md-8", ""], ["offset-lg-3", ""], ["offset-md-2", ""]], null, null, null, null, null)), i.Y(17, 16384, null, 0, f.a, [], null, null), (n()(),
            i._18(-1, null, ["\n        "])), i._12(null, 0), (n()(),
            i._18(-1, null, ["\n      "])), (n()(),
            i._18(-1, null, ["\n    "])), (n()(),
            i._18(-1, null, ["\n  "])), (n()(),
            i._18(-1, 1, ["\n"])), (n()(),
            i._18(-1, null, ["\n"]))], function(n, l) {
                n(l, 4, 0, l.component.page_title)
            }, function(n, l) {
                n(l, 7, 0, i._13(l, 8).statusbarPadding, i._13(l, 8)._hasRefresher)
            })
        }
        var i = t(0)
          , o = t(107)
          , a = t(2)
          , r = t(6)
          , s = t(198)
          , c = t(48)
          , d = t(8)
          , h = t(21)
          , p = t(58)
          , g = t(43)
          , f = t(42)
          , _ = t(20)
          , m = t(14)
          , v = t(169)
          , b = t(34)
          , y = t(108)
          , C = t(62)
          , w = t(27)
          , k = t(191)
          , P = i.X({
            encapsulation: 2,
            styles: [],
            data: {}
        })
          , S = t(72)
          , T = t(23)
          , E = t(5)
          , Y = t(7)
          , I = t(26);
        t(87);
        t.d(l, "a", function() {
            return x
        }),
        l.b = u;
        var x = i.X({
            encapsulation: 2,
            styles: [],
            data: {}
        })
    },
    153: function(n, l, t) {
        "use strict";
        t.d(l, "a", function() {
            return u
        });
        t(3),
        t(13);
        var e = t(116)
          , u = function() {
            function n(n, l, t, e, u, i, o, a, r, s, c) {
                this.navCtrl = n,
                this.navParams = l,
                this.platform = t,
                this.alertCtrl = e,
                this.menuCtrl = u,
                this.loadingCtrl = i,
                this.blynk = o,
                this.settings = a,
                this.subs = r,
                this.onboarding = s,
                this.appCtrl = c,
                this.registerCredentials = {
                    email: "",
                    password: ""
                },
                this.whichSubmit = "login",
                this.didResetPassword = !1
            }
            return n.prototype.ngAfterViewInit = function() {
                var n = this;
                this.settings.load().then(function(l) {
                    "account"in l && (n.registerCredentials.email = l.account,
                    l.account && "passwordHash"in l && l.passwordHash ? (n.whichSubmit = "login",
                    n.login(l.passwordHash)) : n.registerCredentials.email ? setTimeout(function() {
                        return n.passwordBox.setFocus()
                    }, 300) : setTimeout(function() {
                        return n.emailBox.setFocus()
                    }, 300))
                }).catch(function(n) {})
            }
            ,
            n.prototype.ionViewDidEnter = function() {
                this.menuCtrl.enable(!1, "right")
            }
            ,
            n.prototype.ionViewWillLeave = function() {
                this.menuCtrl.enable(!0, "right")
            }
            ,
            n.prototype.isEmailValid = function() {
                return "" != this.registerCredentials.email
            }
            ,
            n.prototype.clickLogin = function() {
                this.whichSubmit = "login"
            }
            ,
            n.prototype.clickRegister = function() {
                this.navCtrl.push(e.a)
            }
            ,
            n.prototype.clickReset = function() {
                this.resetPassword()
            }
            ,
            n.prototype.login = function(n) {
                var l = this;
                void 0 === n && (n = ""),
                this.showLoading(),
                this.registerCredentials.email = this.registerCredentials.email.toLowerCase().trim(),
                "" == n && (n = this.blynk.hashPassword(this.registerCredentials.password, this.registerCredentials.email)),
                this.blynk.setCredentials(this.registerCredentials.email, n),
                this.blynk.doLoginAndReload().then(function(n) {
                    l.settings.setValue("account", l.registerCredentials.email)
                }).then(function() {
                    return l.loading.dismiss()
                }).then(function() {
                    return l.settings.setValue("passwordHash", n)
                }).then(function() {
                    return l.onboarding.updatePage()
                }).catch(function(n) {
                    l.showError(n),
                    l.settings.setValue("passwordHash", "")
                })
            }
            ,
            n.prototype.resetPassword = function() {
                var n = this;
                this.didResetPassword = !1,
                this.showLoading("Resetting password"),
                this.blynk.resetPassword(this.registerCredentials.email).then(function(l) {
                    n.didResetPassword = l,
                    n.loading.dismiss()
                }).catch(function(l) {
                    return n.showError(l, "Couldn't reset password")
                })
            }
            ,
            n.prototype.showLoading = function(n) {
                void 0 === n && (n = "Logging in"),
                this.loading = this.loadingCtrl.create({
                    content: n + "...",
                    dismissOnPageChange: !0
                }),
                this.loading.present()
            }
            ,
            n.prototype.showError = function(n, l) {
                void 0 === l && (l = "Couldn't log in"),
                this.loading && this.loading.dismiss();
                this.alertCtrl.create({
                    title: l,
                    subTitle: n,
                    buttons: ["OK"]
                }).present()
            }
            ,
            n
        }()
    },
    191: function(n, l, t) {
        "use strict";
        t.d(l, "a", function() {
            return e
        });
        t(3);
        var e = function() {
            return function() {}
        }()
    },
    192: function(n, l, t) {
        "use strict";
        function e(n, l) {
            return [new Date(Math.min(n[0].valueOf(), l[0].valueOf())), new Date(Math.max(n[1].valueOf(), l[1].valueOf()))]
        }
        function u(n) {
            return n[0].valueOf() >= n[1].valueOf()
        }
        function i(n, l) {
            return !u(n) && !u(l) && (n[1].valueOf() >= l[0].valueOf() && n[0].valueOf() <= l[0].valueOf() || l[1].valueOf() >= n[0].valueOf() && l[0].valueOf() <= n[0].valueOf())
        }
        function o(n, l, t) {
            void 0 === t && (t = !1);
            var e = 1e3 * l;
            return new Date(Math.ceil(n.getTime() / e + (t ? 1 : 0)) * e)
        }
        function a(n, l, t) {
            void 0 === t && (t = !1);
            var e = 1e3 * l;
            return new Date(Math.floor(n.getTime() / e - (t ? 1 : 0)) * e)
        }
        function r(n) {
            return "[" + Object(y.b)(n[0]) + " - " + Object(y.b)(n[1]) + "]"
        }
        function s(n) {
            return n.t
        }
        function c(n) {
            return n.y
        }
        function d(n, l) {
            n.y = l
        }
        function h(n) {
            var l = 60;
            return "week" != n && "month" != n && "three_months" != n && "all" != n || (l = 3600),
            l
        }
        function p(n, l) {
            return b.duration(b(l).diff(b(n))).as("minutes")
        }
        function g(n) {
            return null !== n.y
        }
        function f(n, l) {
            return [Math.min(n[0], l[0]), Math.max(n[1], l[1])]
        }
        t(3),
        t(0);
        var _ = t(278)
          , m = t(35)
          , v = t.n(m)
          , b = t(1)
          , y = t(144)
          , C = function() {
            function n(n, l) {
                this.data = n,
                this.resolution = l
            }
            return n.prototype.toString = function() {
                var n = "TimeDataset of " + this.data.length + " series";
                return this.data.length && (n += " of " + this.data[0].length + " points in time range " + r(this.bounds())),
                n
            }
            ,
            n.prototype.start = function() {
                if (this.data.length && this.data[0].length) {
                    var n = s(this.data[0][0]);
                    return n = a(n, this.resolution)
                }
            }
            ,
            n.prototype.end = function() {
                if (this.data.length && this.data[0].length) {
                    var n = s(v.a.last(this.data[0]));
                    return n = o(n, this.resolution)
                }
            }
            ,
            n.prototype.bounds = function() {
                return [this.start(), this.end()]
            }
            ,
            n.prototype.length = function() {
                return this.data ? this.data[0].length : 0
            }
            ,
            n
        }()
          , w = this && this.__extends || function() {
            var n = Object.setPrototypeOf || {
                __proto__: []
            }instanceof Array && function(n, l) {
                n.__proto__ = l
            }
            || function(n, l) {
                for (var t in l)
                    l.hasOwnProperty(t) && (n[t] = l[t])
            }
            ;
            return function(l, t) {
                function e() {
                    this.constructor = l
                }
                n(l, t),
                l.prototype = null === t ? Object.create(t) : (e.prototype = t.prototype,
                new e)
            }
        }()
          , k = {
            one_hour: 60,
            six_hours: 360,
            day: 1440,
            week: 10080,
            month: 43200,
            three_months: 129600
        }
          , P = {
            60: "day",
            3600: "three_months"
        }
          , S = function(n) {
            function l(l, t, e, u) {
                void 0 === t && (t = "day"),
                void 0 === e && (e = new Date),
                void 0 === u && (u = 0);
                var i = n.call(this, l, h(t)) || this;
                return i.duration = t,
                i.requestTime = e,
                i.receiveTime = new Date,
                i.pageOffset = u,
                l && i.nullData(),
                i
            }
            return w(l, n),
            l.prototype.toString = function() {
                return "Graph data at " + this.resolution + "s: " + n.prototype.toString.call(this)
            }
            ,
            l.prototype.pageMinutes = function() {
                return k[this.duration]
            }
            ,
            l.prototype.pageSamples = function() {
                return k[this.duration] / (h(this.duration) / 60)
            }
            ,
            l.prototype.isComplete = function() {
                return this.length() >= this.pageSamples()
            }
            ,
            l.prototype.pageOffsetIn = function(n) {
                return this.pageOffset * this.pageMinutes() / n
            }
            ,
            l.prototype.currentOffset = function() {
                return Math.floor(this.pageOffset + p(this.receiveTime, new Date) / this.pageMinutes())
            }
            ,
            l.prototype.ageInSeconds = function() {
                return function(n, l) {
                    return b.duration(b(l).diff(b(n))).as("seconds")
                }(this.receiveTime, new Date)
            }
            ,
            l.prototype.convertData = function(n) {
                for (var l = 0, t = this.data; l < t.length; l++)
                    for (var e = t[l], u = 0; u < e.length; u++)
                        c(e[u]) && d(e[u], n(c(e[u])))
            }
            ,
            l.prototype.nullData = function() {
                for (var n = 1.5 * this.resolution * 1e3, l = 0, t = this.data; l < t.length; l++)
                    for (var e = t[l], u = 0; u < e.length - 1; u++)
                        if (s(e[u + 1]) - s(e[u]) > n) {
                            var i = new Date((s(e[u]).valueOf() + s(e[u + 1]).valueOf()) / 2);
                            e.splice(u + 1, 0, {
                                t: i,
                                y: null
                            }),
                            u += 1
                        }
            }
            ,
            l
        }(C)
          , T = function() {
            function n(n) {
                this.resolution = n,
                this.clear()
            }
            return n.prototype.getResolution = function() {
                return this.resolution
            }
            ,
            n.prototype.toString = function() {
                var n = "res: " + this.resolution + ", " + this.extents.length + " extents";
                if (this.extents.length) {
                    n += ": ";
                    for (var l in this.extents)
                        n += r(this.extents[l]),
                        +l < this.extents.length - 1 && (n += ", ")
                }
                return n
            }
            ,
            n.prototype.clear = function() {
                this.extents = []
            }
            ,
            n.prototype.add = function(n) {
                var l = this.findEntryAtOrBefore(n);
                this.extents.splice(l + 1, 0, n),
                this.coalesce(l)
            }
            ,
            n.prototype.bounds = function() {
                return [this.extents[0][0], this.extents[this.extents.length - 1][1]]
            }
            ,
            n.prototype.isEmpty = function() {
                return 0 == this.extents.length || u(this.bounds())
            }
            ,
            n.prototype.limitTo = function(n) {
                for (var l = n[0], t = n[1], e = 0; e < this.extents.length; e++)
                    l && (this.extents[e][1] < l ? this.extents.splice(e, 1) : (this.extents[e][1] < l && (this.extents[e][1] = l),
                    e++));
                for (e = 0; e < this.extents.length; e++)
                    t && (this.extents[e][0] > t ? this.extents.splice(e, 1) : (this.extents[e][1] > t && (this.extents[e][1] = t),
                    e++))
            }
            ,
            n.prototype.findEntryAfter = function(n) {
                return v.a.sortedIndexBy(this.extents, n, function(n) {
                    return n[0]
                })
            }
            ,
            n.prototype.findEntryAtOrBefore = function(n) {
                var l = this.findEntryAfter(n);
                return l < 0 ? l : l < this.extents.length && this.extents[l][0].valueOf() == n[0].valueOf() ? l : l - 1
            }
            ,
            n.prototype.coalesce = function(n) {
                for (; n < this.extents.length - 1; )
                    if (n >= 0) {
                        if (!i(this.extents[n], this.extents[n + 1]))
                            return;
                        var l = e(this.extents[n], this.extents[n + 1]);
                        this.extents.splice(n, 2, l)
                    } else
                        n = 0
            }
            ,
            n.prototype.subtractFrom = function(l) {
                var t = l.slice();
                console.log("subtractFrom(): " + r(t) + " - " + this.toString());
                var e = new n(this.resolution)
                  , s = this.findEntryAtOrBefore(t);
                for (s < 0 && (s = 0); s < this.extents.length && !u(t); )
                    if (i(this.extents[s], t))
                        if (t[0].valueOf() >= this.extents[s][0].valueOf())
                            t[0] = o(this.extents[s][1], this.resolution, !0),
                            s += 1;
                        else {
                            var c = [t[0], a(this.extents[s][0], this.resolution, !0)];
                            e.add(c),
                            t[0] = this.extents[s][0]
                        }
                    else
                        t[1].valueOf() < this.extents[0][0].valueOf() ? (e.add(t),
                        t[0] = t[1]) : s += 1;
                return u(t) || e.add(t),
                e
            }
            ,
            n
        }()
          , E = this && this.__extends || function() {
            var n = Object.setPrototypeOf || {
                __proto__: []
            }instanceof Array && function(n, l) {
                n.__proto__ = l
            }
            || function(n, l) {
                for (var t in l)
                    l.hasOwnProperty(t) && (n[t] = l[t])
            }
            ;
            return function(l, t) {
                function e() {
                    this.constructor = l
                }
                n(l, t),
                l.prototype = null === t ? Object.create(t) : (e.prototype = t.prototype,
                new e)
            }
        }()
          , Y = function(n) {
            function l(l) {
                var t = n.call(this, [], l) || this;
                return t.rangeCovered = new T(l),
                t
            }
            return E(l, n),
            l.prototype.toString = function() {
                return n.prototype.toString.call(this) + " with " + this.rangeCovered
            }
            ,
            l.prototype.merge = function(n) {
                for (var l in n.data) {
                    var t = n.data[l].slice()
                      , e = n.start()
                      , u = n.end();
                    if (this.data[l])
                        if (this.data[l].length) {
                            var i = _.d(s).left(this.data[l], e)
                              , o = _.d(s).right(this.data[l], u);
                            (a = this.data[l]).splice.apply(a, [i, o - i].concat(t))
                        } else
                            this.data[l] = t;
                    else
                        this.data.push(t)
                }
                this.rangeCovered.add(n.bounds());
                var a
            }
            ,
            l
        }(C)
          , I = v.a.invert(k)
          , x = function() {
            function n(n) {
                this.resolution = n,
                this.pages = []
            }
            return n.prototype.add = function(n) {
                var l = v.a.sortedIndexBy(this.pages, n, function(n) {
                    return n.start()
                });
                this.pages.splice(l, 0, n),
                n.isComplete() || n.start() && (this.earliestDatum = n.start())
            }
            ,
            n.prototype.findPage = function(n) {
                var l = new S([[{
                    t: n
                }]]);
                return v.a.sortedIndexBy(this.pages, l, function(n) {
                    return n.start()
                })
            }
            ,
            n.prototype.getMostRecentPage = function(n, l) {
                void 0 === n && (n = 0),
                void 0 === l && (l = "");
                for (var t = this.pages.length - 1; t >= 0; t--)
                    if (this.pages[t].pageOffset == n && ("" == l || this.pages[t].duration == l))
                        return this.pages[t]
            }
            ,
            n.prototype.estimatePageOffset = function(n, l) {
                var t = k[n]
                  , e = this.findPage(l[0])
                  , u = this.pages[e];
                if (u) {
                    console.log("EPO: [");
                    for (var i in this.pages) {
                        var o = "EPO:  ";
                        i == e && (o = "EPO: *"),
                        console.log(o + r(this.pages[i].bounds()) + " - " + this.pages[i].duration + " + " + this.pages[i].pageOffset)
                    }
                    console.log("EPO: ]");
                    var a = (p(u.receiveTime, new Date) + p(l[1], u.end())) / t
                      , s = Math.floor(u.pageOffsetIn(t) + a);
                    for ((s = Math.max(s, 0)) == u.pageOffsetIn(t) && (s += 1); s >= 0 && this.pageIsEarlier(n, s, l, e); )
                        s -= 1;
                    return s
                }
                console.log("EPO: no followingPage");
                var c = p(l[1], new Date);
                return Math.floor(c / t)
            }
            ,
            n.prototype.pageIsEarlier = function(n, l, t, e) {
                for (var u = 0; u < 31; u++) {
                    var i = this.pages[e - u];
                    if (!i)
                        return !1;
                    if (i.duration == n && i.currentOffset() == l && i.end() < t[0])
                        return !0
                }
                return !1
            }
            ,
            n.prototype.mergeInRange = function(n) {
                for (var l = k[P[this.resolution]], t = b(n[0]).subtract(l, "minutes").toDate(), e = new Y(this.resolution), u = this.findPage(t); this.pages[u] && this.pages[u].start() <= n[1]; u += 1)
                    i(this.pages[u].bounds(), n) && e.merge(this.pages[u]);
                return e
            }
            ,
            n
        }()
          , j = function() {
            function n(n, l, t) {
                this.blynk = t,
                this.unitConverter = function(n) {
                    return n
                }
                ,
                this.deviceId = n,
                this.widgetId = l,
                this.clear()
            }
            return n.prototype.clear = function() {
                this.pageLists = new Map,
                this.seekingPages = 0
            }
            ,
            n.prototype.seekData = function(n, l, t) {
                this.seekResolution = n,
                this.seekTimeRange = l,
                this.seekHandler = t,
                this.seekPagesLoaded = 0,
                u(l = function(n, l) {
                    var t = [Math.max(n[0].valueOf(), l[0].valueOf()), Math.min(n[1].valueOf(), l[1].valueOf())];
                    return t[1] = Math.max(t[0], t[1]),
                    [new Date(t[0]), new Date(t[1])]
                }(l, [this.dataStartTime(), new Date])) || (this.seekResult = this.getPageList(n).mergeInRange(l),
                console.log("seekData(" + r(l) + ") finds " + r(this.seekResult.bounds())),
                this.seekNextPage() || this.seekHandler(this.seekResult))
            }
            ,
            n.prototype.seekNextPage = function() {
                var n = this
                  , l = this.seekResult.rangeCovered.subtractFrom(this.seekTimeRange);
                if (l.limitTo([this.getPageList(this.seekResolution).earliestDatum, this.latestAvailableTime(this.seekResolution)]),
                l.isEmpty())
                    return !1;
                console.log("missing: " + l);
                var t = this.matchPageDuration(this.seekResolution, l.bounds())
                  , e = this.getPageList(this.seekResolution).estimatePageOffset(t, l.bounds());
                if (e < 0)
                    return !1;
                var u = this.lastReceivedPage(t, e);
                return u && u.ageInSeconds() < 30 ? (console.log("Received", t, "offset", e, "at", u.receiveTime, "so won't re-request yet."),
                !1) : (this.seekingPages += 1,
                console.log("seekNextPage():", this.seekingPages),
                this.loadPage(t, e).then(function(l) {
                    n.seekingPages -= 1,
                    n.receivePage(l)
                }).catch(function(l) {
                    return n.seekingPages -= 1,
                    !1
                }),
                !0)
            }
            ,
            n.prototype.receivePage = function(n) {
                console.log("receivePage(" + n + ")"),
                this.seekPagesLoaded++,
                this.seekResult.merge(n),
                this.seekHandler(this.seekResult),
                this.seekPagesLoaded <= 10 && this.seekNextPage()
            }
            ,
            n.prototype.matchPageDuration = function(n, l) {
                for (var t, e = b.duration(b(l[1]).diff(b(l[0]))).as("minutes"), u = 0, i = v.a.keys(I); u < i.length; u++) {
                    var o = i[u]
                      , a = I[o];
                    if (h(a) == n && (t = a,
                    o >= e))
                        return a
                }
                return t
            }
            ,
            n.prototype.loadPage = function(n, l) {
                var t = this;
                void 0 === l && (l = 0),
                console.log("loadPage(" + n + ", " + l + ") for device " + this.deviceId);
                var e = new Date;
                return this.blynk.getGraphData(this.widgetId, n, l, this.deviceId).then(function(u) {
                    var i = v.a.cloneDeep(u)
                      , o = new S(i,n,e,l);
                    return t.addPage(o),
                    o.convertData(t.unitConverter),
                    o
                })
            }
            ,
            n.prototype.addPage = function(n) {
                this.getPageList(n.resolution).add(n)
            }
            ,
            n.prototype.getPageList = function(n) {
                if (n in this.pageLists)
                    return this.pageLists[n];
                var l = new x(n);
                return this.pageLists[n] = l,
                l
            }
            ,
            n.prototype.latestAvailableTime = function(n) {
                var l = this.getPageList(n).getMostRecentPage();
                if (l) {
                    var t = b.duration(b(l.end()).diff(b(l.receiveTime), "minutes"));
                    return b().subtract(1, "minute").add(t).toDate()
                }
                return b().subtract(2, "minutes").toDate()
            }
            ,
            n.prototype.dataStartTime = function() {
                var n = void 0;
                return this.maxDaysOld && (n = b().subtract(this.maxDaysOld, "days").toDate()),
                v.a.max([this.blynk.dataStartDate(), n])
            }
            ,
            n.prototype.lastReceivedPage = function(n, l) {
                return void 0 === l && (l = 0),
                this.getPageList(h(n)).getMostRecentPage(l, n)
            }
            ,
            n
        }();
        t(15),
        t(69);
        t.d(l, "a", function() {
            return Z
        });
        var D = {
            label: "",
            minRange: [0, 1],
            color: "black",
            opacity: .5,
            showLine: !0,
            showArea: !1,
            showPoints: !1,
            data: []
        }
          , A = 0
          , Z = function() {
            function n(n, l) {
                var t = this;
                this.blynk = n,
                this.monitor = l,
                this.getDisplayStr = function(n) {
                    return n.toLocaleString([], {
                        maximumFractionDigits: 1
                    })
                }
                ,
                this.unitConverter = function(n) {
                    return n
                }
                ,
                this.deviceID = -1,
                this.widgetID = -1,
                this.guid = "chartElement-" + A++,
                this.duration = "day",
                this.throttledInfillData = v.a.throttle(function() {
                    return t.infillData()
                }, 1e3, {
                    maxWait: 1e3,
                    leading: !0,
                    trailing: !0
                }),
                this.markers = [],
                this.monitorStatus = this.monitor.status$.subscribe(function(n) {
                    return t.updateCurrentStatus(n)
                })
            }
            return n.prototype.setDisplayStrFunc = function(n) {
                this.getDisplayStr = n
            }
            ,
            n.prototype.setUnitConverter = function(n) {
                this.unitConverter = n,
                this.dataLoader && (this.dataLoader.unitConverter = n)
            }
            ,
            n.prototype.updateCurrentStatus = function(n) {
                "OK" == n && this.isInitialized() && this.refreshChart()
            }
            ,
            n.prototype.isInitialized = function() {
                return this.datasets && this.datasets.length > 0
            }
            ,
            n.prototype.setTimeSpan = function(n) {
                this.duration = n,
                this.refreshChart()
            }
            ,
            n.prototype.initDatasets = function(n, l, t, e, u) {
                this.dataLoader = new j(this.deviceID,this.widgetID,this.blynk),
                this.dataLoader.unitConverter = this.unitConverter,
                this.reverseDatasets = l,
                l && (n = n.reverse()),
                this.datasets = [];
                for (var i in n)
                    this.datasets.push(v.a.create(D, n[i]));
                this.markers = e || [],
                this.shadedAreas = u || [],
                this.dataLoader.clear(),
                this.dataLoader.maxDaysOld = t,
                this.createChart(),
                this.resizeChart(),
                this.refreshChart(),
                this.infillData(),
                this.restartTimer()
            }
            ,
            n.prototype.setMarkers = function(n, l) {
                this.markers = n || [],
                this.shadedAreas = l || [],
                this.renderChart()
            }
            ,
            n.prototype.createChart = function() {
                var n = this;
                if (this.svg = _.n("#" + this.guid),
                this.svg.selectAll("*").remove(),
                this.margin = {
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 40
                },
                this.x = _.m(),
                this.xUnzoomed = _.m(),
                this.y = _.l(),
                this.datasets.length > 0) {
                    this.y.domain(this.datasets[0].minRange);
                    for (var l in this.datasets)
                        this.y.domain(f(this.y.domain(), this.datasets[l].minRange))
                }
                this.xAxis = _.b(this.x),
                this.yAxis = _.c(this.y),
                this.xGrid = _.b(this.x).tickFormat(""),
                this.yGrid = _.c(this.y).tickFormat(""),
                this.seriesLine = _.i().curve(_.f).x(function(l) {
                    return n.x(s(l))
                }).y(function(l) {
                    return n.y(c(l))
                }).defined(g),
                this.seriesArea = _.a().curve(_.f).x(function(l) {
                    return n.x(s(l))
                }).y1(function(l) {
                    return n.y(c(l))
                }).defined(g),
                this.shadedArea = _.a().curve(_.e).x(function(l, t) {
                    return n.x.range()[t]
                }).y0(function(l) {
                    return n.y(l.value)
                }).y1(function(l) {
                    return n.y.range()[l.directionUp ? 1 : 0]
                });
                var t = this.svg.append("defs");
                for (l in this.shadedAreas) {
                    var e = t.append("linearGradient").attr("id", "gradient" + l).attr("x1", 0).attr("x2", 0).attr("y1", this.shadedAreas[l].directionUp ? 1 : 0).attr("y2", this.shadedAreas[l].directionUp ? 0 : 1);
                    e.append("stop").attr("offset", 0).attr("stop-color", "white").attr("stop-opacity", .35),
                    e.append("stop").attr("offset", 1).attr("stop-color", this.shadedAreas[l].color).attr("stop-opacity", .5)
                }
                this.zoomContainer = this.svg.append("g").attr("class", "zoom").attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")"),
                this.gXGrid = this.zoomContainer.append("g").attr("class", "grid"),
                this.gYGrid = this.zoomContainer.append("g").attr("class", "grid"),
                this.gXAxis = this.zoomContainer.append("g").attr("class", "axis axis--x"),
                this.gYAxis = this.zoomContainer.append("g").attr("class", "axis axis--y"),
                this.gMarkerLines = this.zoomContainer.append("g").attr("class", "axis marker-line"),
                this.gSeriesLinePaths = [],
                this.gSeriesAreaPaths = [],
                this.gSeriesPoints = [];
                for (l in this.datasets)
                    this.gSeriesAreaPaths.push(this.zoomContainer.append("path").attr("class", "area").style("fill", this.datasets[l].color).style("fill-opacity", this.datasets[l].opacity).datum([]));
                this.gShadedAreas = this.zoomContainer.append("g").attr("class", "area shaded-area"),
                this.gShadedAreaPaths = [];
                for (l in this.shadedAreas)
                    this.gShadedAreaPaths.push(this.gShadedAreas.append("path").attr("class", "shaded-area").style("fill", "url(#gradient" + l + ")").datum([]));
                for (l in this.datasets)
                    this.gSeriesLinePaths.push(this.zoomContainer.append("path").attr("class", "line").style("stroke", this.datasets[l].color).datum([])),
                    this.gSeriesPoints.push(this.zoomContainer.append("g").attr("class", "points").style("stroke", this.datasets[l].color).datum([]));
                var u = _.n(".legend");
                if (u.selectAll("*").remove(),
                this.datasets.length > 1) {
                    var i = this.datasets.slice(0);
                    i.reverse();
                    var o = u.selectAll("legend").data(i);
                    u.append("div").attr("class", "legend-spacer");
                    var a = o.enter().append("span").attr("class", "series-name");
                    a.append("span").attr("class", "series-swatch").style("background", function(n) {
                        return n.color
                    }),
                    a.append("text").text(function(n) {
                        return n.label
                    })
                }
                this.gCrosshairs = this.zoomContainer.append("g").attr("class", "focus").style("display", "none"),
                this.gCrosshairs.append("line").attr("id", "focusLineX"),
                this.gCrosshairs.append("text").attr("id", "focusTextLeft").attr("dx", -5).attr("text-anchor", "end"),
                this.gCrosshairs.append("text").attr("id", "focusTextMiddle").attr("dx", 0).attr("text-anchor", "middle"),
                this.gCrosshairs.append("text").attr("id", "focusTextRight").attr("dx", 5).attr("text-anchor", "start"),
                this.zoomContainer.on("mouseenter", function() {
                    return n.showCrosshairs()
                }),
                this.zoomContainer.on("mouseleave", function() {
                    return n.hideCrosshairs()
                });
                var r = this;
                this.zoomContainer.on("mousemove", function(n) {
                    r.showCrosshairs(),
                    r.updateCrosshairs(this)
                }),
                this.zoom = _.o().on("zoom", function() {
                    return n.zoomed()
                }),
                this.zoomContainer.call(this.zoom),
                this.zoomContainer.on("dblclick.zoom", function() {
                    return n.doubleClickZoom()
                }),
                this.clipRect = this.svg.append("defs").append("clipPath").attr("id", "clip").append("rect").attr("transform", "translate(0, -" + this.margin.top + ")"),
                _.n(window).on("resize." + this.guid, function() {
                    return n.resizeChart()
                })
            }
            ,
            n.prototype.numTicks = function() {
                return {
                    x: Math.max(this.width / 70, 2),
                    y: Math.max(this.height / 50, 2)
                }
            }
            ,
            n.prototype.measure = function() {
                var n = this.width
                  , l = this.height
                  , t = this.svg;
                return this.width = parseInt(t.style("width")) - this.margin.left - this.margin.right,
                this.height = parseInt(t.style("height")) - this.margin.top - this.margin.bottom,
                this.width != n || this.height != l
            }
            ,
            n.prototype.resizeChart = function() {
                this.measure(),
                this.width <= 0 || (this.zoomContainer.attr("width", this.width).attr("height", this.height),
                this.x.range([0, this.width]),
                this.xUnzoomed.range([0, this.width]),
                this.y.range([this.height, 0]),
                this.xAxis.ticks(this.numTicks().x),
                this.yAxis.ticks(this.numTicks().y),
                this.xGrid.ticks(this.numTicks().x).tickSize(-this.height),
                this.yGrid.ticks(this.numTicks().y).tickSize(-this.width),
                this.gXGrid.attr("transform", "translate(0," + this.height + ")"),
                this.gXAxis.attr("transform", "translate(0," + this.height + ")"),
                this.seriesArea.y0(this.height),
                this.zoom.translateExtent([[-1 / 0, 0], [this.width, this.height]]).extent([[0, 0], [this.width, this.height]]),
                this.clipRect.attr("width", this.width).attr("height", this.height + this.margin.top),
                this.renderChart())
            }
            ,
            n.prototype.refreshChart = function() {
                this.resetZoom()
            }
            ,
            n.prototype.receiveDataPage = function(n) {
                console.log(n.toString()),
                this.integrateData(n),
                this.renderChart()
            }
            ,
            n.prototype.isLoadingData = function() {
                return !this.dataLoader || this.dataLoader.seekingPages > 0
            }
            ,
            n.prototype.integrateData = function(n) {
                if (this.datasets) {
                    var l = n.data;
                    this.reverseDatasets && (l = l.reverse());
                    for (var t in l)
                        this.datasets[t] && (this.datasets[t].data = l[t]);
                    var e = this.y.domain().concat(this.datasets[0].data.map(function(n) {
                        return function(l) {
                            return s(l) >= n ? c(l) : null
                        }
                    }(this.dataLoader.dataStartTime()))).concat(this.markers.map(function(n) {
                        return n.includeInRange ? n.value : void 0
                    }));
                    this.y.domain(_.h(e))
                }
            }
            ,
            n.prototype.zoomFactor = function() {
                var n = this.x.domain()
                  , l = this.xUnzoomed.domain();
                return (l[1] - l[0]) / (n[1] - n[0])
            }
            ,
            n.prototype.renderChart = function() {
                var n = this
                  , l = this.dataLoader.dataStartTime();
                for (var t in this.datasets) {
                    var e = this.datasets[t].data.filter(function(n, t) {
                        return s(n) >= l
                    });
                    if (this.datasets[t].showLine && (this.gSeriesLinePaths[t].datum(e),
                    this.gSeriesLinePaths[t].attr("d", this.seriesLine)),
                    this.datasets[t].showArea && (this.gSeriesAreaPaths[t].datum(e),
                    this.gSeriesAreaPaths[t].attr("d", this.seriesArea)),
                    this.datasets[t].showPoints) {
                        var u = this.gSeriesPoints[t].selectAll(".dot").data(e.filter(function(n, l) {
                            return null !== c(n)
                        }));
                        u.enter().append("circle").attr("class", "dot").attr("r", 2).merge(u).attr("cx", function(l) {
                            return n.x(s(l))
                        }).attr("cy", function(l) {
                            return n.y(c(l))
                        }),
                        u.exit().remove()
                    }
                }
                this.setExplcitTicks(this.xAxis, 0),
                this.setExplcitTicks(this.yAxis, 1),
                this.gXAxis.call(this.xAxis),
                this.gYAxis.call(this.yAxis),
                this.gXGrid.call(this.xGrid),
                this.gYGrid.call(this.yGrid);
                var i = this.gMarkerLines.selectAll(".marker-line").data(this.markers);
                i && i.enter && i.enter().append("line").attr("class", "marker-line").style("stroke", function(n) {
                    return n.color
                }).merge(i).attr("x1", this.x.range()[0]).attr("y1", function(l, t) {
                    return n.y(l.value)
                }).attr("x2", this.x.range()[1]).attr("y2", function(l, t) {
                    return n.y(l.value)
                });
                var o = function() {
                    if (a.markers[r].color) {
                        var n = a.markers[r].value;
                        a.gYAxis.selectAll(".tick text").filter(function() {
                            return _.n(this).text() == n
                        }).attr("fill", a.markers[r].color),
                        a.gYAxis.selectAll(".tick").filter(function() {
                            return _.n(this).text() == n
                        }).selectAll("line").attr("stroke", a.markers[r].color)
                    }
                }
                  , a = this;
                for (var r in this.markers)
                    o();
                for (t in this.shadedAreas)
                    this.gShadedAreaPaths[t] && (this.gShadedAreaPaths[t].datum([this.shadedAreas[t], this.shadedAreas[t]]),
                    this.gShadedAreaPaths[t].attr("d", this.shadedArea));
                this.hideCrosshairs()
            }
            ,
            n.prototype.setExplcitTicks = function(n, l) {
                n.tickValues(null);
                var t = this.numTicks()[l ? "y" : "x"]
                  , e = n.scale().ticks(t)
                  , u = v.a.filter(this.markers, function(n) {
                    return n.axis == l
                })
                  , i = v.a.map(u, function(n) {
                    return n.value
                })
                  , o = v.a.concat(e, i);
                n.tickValues(o)
            }
            ,
            n.prototype.zoomed = function() {
                if (!_.g.sourceEvent || "brush" !== _.g.sourceEvent.type) {
                    var n = _.g.transform.rescaleX(this.xUnzoomed);
                    this.x.domain(n.domain()),
                    this.renderChart(),
                    this.clearTimer(),
                    this.throttledInfillData()
                }
            }
            ,
            n.prototype.infillData = function() {
                var n = this
                  , l = this.x.domain();
                if (!u(l)) {
                    var t = this.optimalResolution(l);
                    console.log("infillData() seeking"),
                    this.dataLoader.seekData(t, l, function(l) {
                        return n.receiveDataPage(l)
                    })
                }
            }
            ,
            n.prototype.optimalResolution = function(n) {
                var l = b.duration(b(n[1]).diff(b(n[0]))).as("minutes");
                return this.width / (l / 60) > 10 ? 60 : 3600
            }
            ,
            n.prototype.resetZoom = function() {
                this.zoom.extent([[0, 0], [this.width, this.height]]);
                var n = this.xDurationMinutes();
                if (n) {
                    var l = b()
                      , t = b(l).subtract(n, "minutes");
                    this.xUnzoomed.domain([t.toDate(), l.toDate()])
                } else
                    this.xUnzoomed.domain(_.h(this.datasets[0].data, s));
                this.xUnzoomed.domain(this.xUnzoomed.domain()),
                this.x.domain(this.xUnzoomed.domain()),
                this.xAxis.scale(this.x),
                this.hideCrosshairs(),
                this.zoomContainer.call(this.zoom.transform, _.p),
                this.renderChart(),
                this.restartTimer()
            }
            ,
            n.prototype.doubleClickZoom = function() {
                this.resetZoomAnimated()
            }
            ,
            n.prototype.resetZoomAnimated = function() {
                this.zoomContainer.transition().duration(500).call(this.zoom.transform, _.p),
                this.restartTimer()
            }
            ,
            n.prototype.showCrosshairs = function() {
                this.gCrosshairs.style("display", null)
            }
            ,
            n.prototype.hideCrosshairs = function() {
                this.gCrosshairs.style("display", "none")
            }
            ,
            n.prototype.findClosestData = function(n) {
                for (var l = [], t = 0, e = this.datasets; t < e.length; t++) {
                    var u = e[t];
                    if (u.data) {
                        if (0 == u.data.length)
                            return null;
                        n = v.a.max([n, this.dataLoader.dataStartTime()]);
                        var i = _.d(s).left(u.data, n);
                        i >= u.data.length && (i = u.data.length - 1);
                        for (var o = u.data[i]; null === c(o) && i < u.data.length; )
                            o = u.data[i += 1];
                        var a = o;
                        if (i > 0)
                            for (a = u.data[i - 1]; null === c(a) && i > 0; )
                                a = u.data[i -= 1];
                        n - s(a) < s(o) - n && a >= this.dataLoader.dataStartTime() && (o = a),
                        l.push(o)
                    } else
                        l.push(null)
                }
                return l
            }
            ,
            n.prototype.updateCrosshairs = function(n) {
                var l = this
                  , t = this.x.invert(_.k(n)[0])
                  , e = this.findClosestData(t);
                if (e && e[0]) {
                    var u = s(e[0])
                      , i = e.map(c)
                      , o = this.x(u)
                      , a = i.map(function(n) {
                        return l.y(n)
                    })
                      , r = new Date(u)
                      , d = r.toLocaleDateString() + " " + r.toLocaleTimeString([], {
                        hour: "numeric",
                        minute: "numeric"
                    })
                      , h = e.map(function(n) {
                        return l.getDisplayStr(c(n), !0)
                    });
                    this.reverseDatasets && (h = h.reverse());
                    var p, g = h.join(", "), f = (o - this.x.range()[0]) / (this.x.range()[1] - this.x.range()[0]), m = "", v = "", b = "", y = this.y.range()[0] - (5 + this.gXAxis.node().getBBox().height + 5);
                    if (_.j(a) < y)
                        p = this.y.range()[0],
                        f < .25 ? b = g + " @ " + d : f < .5 ? (m = g,
                        b = d) : f < .75 ? (m = d,
                        b = g) : m = d + ": " + g;
                    else {
                        p = this.y.range()[1];
                        var C = g + " @ " + d;
                        f < 1 / 3 ? b = C : f < 2 / 3 ? v = C : m = C
                    }
                    this.gCrosshairs.select("#focusLineX").attr("x1", o).attr("y1", this.y.range()[0]).attr("x2", o).attr("y2", this.y.range()[1]);
                    var w = this.gCrosshairs.selectAll(".focusLineY").data(a);
                    w.enter().append("line").attr("class", "focusLineY").merge(w).attr("x1", this.x.range()[0]).attr("y1", function(n, l) {
                        return n
                    }).attr("x2", this.x.range()[1]).attr("y2", function(n, l) {
                        return n
                    }),
                    w.exit().remove(),
                    this.gCrosshairs.select("#focusTextLeft").attr("transform", "translate(" + o + "," + p + ")").attr("dy", -5).text(m),
                    this.gCrosshairs.select("#focusTextMiddle").attr("transform", "translate(" + o + "," + p + ")").attr("dy", -5).text(v),
                    this.gCrosshairs.select("#focusTextRight").attr("transform", "translate(" + o + "," + p + ")").attr("dy", -5).text(b)
                }
            }
            ,
            n.prototype.refreshPeriod = function() {
                var n = this.xResolution();
                return "day" == this.duration && (n = 300),
                n + 10
            }
            ,
            n.prototype.xResolution = function() {
                return h(this.duration)
            }
            ,
            n.prototype.xDurationMinutes = function() {
                return this.duration in k ? k[this.duration] : null
            }
            ,
            n.prototype.clearTimer = function() {
                this.refreshTimer && (clearInterval(this.refreshTimer),
                this.refreshTimer = void 0)
            }
            ,
            n.prototype.restartTimer = function() {
                var n = this;
                this.clearTimer(),
                this.refreshTimer = setInterval(function() {
                    return n.refreshChart()
                }, 1e3 * this.refreshPeriod())
            }
            ,
            n.prototype.updateIfNeeded = function() {
                this.outOfDate() ? this.refreshChart() : this.measure() && this.resizeChart()
            }
            ,
            n.prototype.outOfDate = function() {
                return 1 == this.zoomFactor() && b(this.x.domain()[1]).add(this.refreshPeriod(), "seconds").isBefore(b())
            }
            ,
            n
        }()
    },
    193: function(n, l, t) {
        "use strict";
        function e(n, l) {
            return void 0 === l && (l = 0),
            isNaN(parseFloat(n)) || isNaN(Number(n)) ? l : Number(n)
        }
        function u(n) {
            return n + "px"
        }
        function i(n) {
            return "hsl(" + n[0] + "," + n[1] + "%," + n[2] + "%)"
        }
        t(3),
        t(0),
        t(402);
        t.d(l, "a", function() {
            return d
        });
        var o = {
            MIN: 0,
            MAX: 100,
            TYPE: "arch",
            THICK: 4,
            FOREGROUND_COLOR: "rgba(0, 150, 136, 1)",
            BACKGROUND_COLOR: "rgba(0, 0, 0, 0.1)",
            CAP: "butt",
            SIZE: 200
        }
          , a = [0, 0, 80]
          , r = [92, 64, 48]
          , s = [0, 64, 42]
          , c = [199, 46, 45]
          , d = function() {
            function n(n, l) {
                this._elementRef = n,
                this._renderer = l,
                this._size = o.SIZE,
                this._min = o.MIN,
                this._initialized = !1,
                this.dataUpdateFlag = !1,
                this.max = o.MAX,
                this.type = o.TYPE,
                this.cap = o.CAP,
                this.thick = o.THICK,
                this.bigTxtColor = "black",
                this.bigTxtTrans = "color 5s",
                this.foregroundColor = o.FOREGROUND_COLOR,
                this.backgroundColor = o.BACKGROUND_COLOR,
                this.overallOpacity = 1,
                this.thresholds = Object.create(null),
                this.showAll = !1,
                this.autoShowAll = !1,
                this.duration = 1200,
                this.valueLow = 0,
                this.valueHigh = 0,
                this.valueSet = 0,
                this._value = NaN,
                this.cPointer = a.slice(),
                this.append = "foo"
            }
            return Object.defineProperty(n.prototype, "size", {
                get: function() {
                    return this._size
                },
                set: function(n) {
                    this._size = e(n)
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(n.prototype, "min", {
                get: function() {
                    return this._min
                },
                set: function(n) {
                    this._min = e(n, o.MIN)
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(n.prototype, "value", {
                get: function() {
                    return this._value
                },
                set: function(n) {
                    this._value = n
                },
                enumerable: !0,
                configurable: !0
            }),
            n.prototype.valueStr = function() {
                return isNaN(this._value) ? "--" : this._value.toString()
            }
            ,
            n.prototype.undoHeartbeat = function() {
                this.bigTxtTrans = "color 16s",
                this.bigTxtColor = "hsl(0, 0%, 0%)"
            }
            ,
            n.prototype.dataHeartbeat = function() {
                this.bigTxtTrans = "color 500ms",
                this.bigTxtColor = i(this.cPointer),
                window.setTimeout(this.undoHeartbeat.bind(this), 1e3)
            }
            ,
            n.prototype.onMouseEnter = function() {
                this.autoShowAll && (this.showAll = !0,
                this._repaint())
            }
            ,
            n.prototype.onMouseLeave = function() {
                this.autoShowAll && (this.showAll = !1,
                this._repaint())
            }
            ,
            n.prototype.onMouseUp = function() {
                this.autoShowAll && (this.showAll = !this.showAll,
                this._repaint())
            }
            ,
            n.prototype.ngOnChanges = function(n) {
                this._initialized && (n.value || n.min || n.max || n.valueHigh || n.valueLow || n.valueSet || n.dataUpdateFlag || n.showAll || n.overallOpacity) && (this.cPointer = this._value < this.valueLow ? c.slice() : this._value > this.valueHigh ? s.slice() : r.slice(),
                n.dataUpdateFlag && this.dataHeartbeat(),
                this._repaint())
            }
            ,
            n.prototype._updateSize = function() {
                this._renderer.setElementStyle(this._elementRef.nativeElement, "width", u(this._getWidth())),
                this._renderer.setElementStyle(this._elementRef.nativeElement, "height", u(this._getCanvasHeight()))
            }
            ,
            n.prototype.ngAfterViewInit = function() {
                this._canvas && this._init()
            }
            ,
            n.prototype.ngOnDestroy = function() {
                this._destroy()
            }
            ,
            n.prototype._valToAngle = function(n) {
                var l = this._getBounds(this.type);
                return l.head + (n - this.min) / (this.max - this.min) * (l.tail - l.head)
            }
            ,
            n.prototype._getBounds = function(n) {
                var l, t;
                return "semi" == n ? (l = Math.PI,
                t = 2 * Math.PI) : "full" == n ? (l = 1.5 * Math.PI,
                t = 3.5 * Math.PI) : "arch" === n && (l = .8 * Math.PI,
                t = 2.2 * Math.PI),
                {
                    head: l,
                    tail: t
                }
            }
            ,
            n.prototype._drawTick = function(n, l) {
                var t = this._getCenter()
                  , e = this._valToAngle(n)
                  , u = this._getRadius() - this.thick / 2
                  , i = this._getRadius() + 1 + this.thick / 2;
                this._context.lineWidth = l;
                var o = t.x + u * Math.cos(e)
                  , a = t.y + u * Math.sin(e)
                  , r = t.x + i * Math.cos(e)
                  , s = t.y + i * Math.sin(e);
                this._context.beginPath(),
                this._context.strokeStyle = "white",
                this._context.moveTo(o, a),
                this._context.lineTo(r, s),
                this._context.stroke()
            }
            ,
            n.prototype._drawMarker = function(n, l) {
                var t = this._getCenter()
                  , e = this._getRadius() + this.thick + 2
                  , u = this._valToAngle(n)
                  , i = t.x + e * Math.cos(u)
                  , o = t.y + e * Math.sin(u)
                  , a = .8 * this.thick;
                l && (this._context.lineWidth = 1,
                this._context.beginPath(),
                this._context.fillStyle = "white",
                this._context.strokeStyle = "black",
                this._context.arc(i, o, a, 0, 2 * Math.PI, !1),
                this._context.stroke(),
                this._context.fill()),
                this._context.font = "10px Arial",
                this._context.fillStyle = "black",
                this._context.textAlign = "center",
                this._context.fillText(Math.round(n).toString(), i, o + 4),
                this._drawTick(n, l ? 2 : 1)
            }
            ,
            n.prototype._drawPointer = function(n, l) {
                var t = this._getCenter()
                  , e = this._getRadius() - this.thick / 2
                  , u = this._valToAngle(n)
                  , i = t.x + e * Math.cos(u)
                  , o = t.y + e * Math.sin(u)
                  , a = e - 2.5 * this.thick
                  , r = .08;
                "white" == l && (r = .1);
                var s = t.x + a * Math.cos(u - r)
                  , c = t.y + a * Math.sin(u - r)
                  , d = t.x + a * Math.cos(u + r)
                  , h = t.y + a * Math.sin(u + r);
                this._context.fillStyle = l,
                this._context.beginPath(),
                this._context.moveTo(i, o),
                this._context.lineTo(s, c),
                this._context.lineTo(d, h),
                this._context.fill()
            }
            ,
            n.prototype._drawArc = function(n, l, t, e) {
                var u = this._getCenter()
                  , i = this._getRadius();
                this._context.lineWidth = this.thick,
                this._context.lineCap = e ? "round" : "butt",
                this._context.beginPath(),
                this._context.strokeStyle = t,
                this._context.arc(u.x, u.y, i, n, l, !1),
                this._context.stroke()
            }
            ,
            n.prototype._draw = function() {
                var n = this._valToAngle(this.valueLow)
                  , l = this._valToAngle(this.valueHigh)
                  , t = (n + l) / 2
                  , e = this._getBounds(this.type)
                  , u = e.head
                  , o = e.tail;
                if (this._clear(),
                this._drawArc(u, o, i(a), !0),
                this._value <= this.valueLow && this._drawArc(u, t, i(c), !0),
                this._value >= this.valueHigh && this._drawArc(t, o, i(s), !0),
                this._drawArc(n, l, i(r), !1),
                this.showAll) {
                    this._drawMarker(this.min, !1),
                    this._drawMarker(this.max, !1),
                    this._drawMarker(this.valueLow, !1),
                    this._drawMarker(this.valueHigh, !1);
                    var d = void 0;
                    for (d = this.min; d <= this.max; d++)
                        this._drawTick(d, 1)
                }
                if (this._drawMarker(this.valueSet, !0),
                !isNaN(this._value)) {
                    var h = Math.min(this._value, this.max);
                    h = Math.max(h, this.min),
                    this._drawPointer(h, i(this.cPointer))
                }
            }
            ,
            n.prototype._clear = function() {
                this._context.clearRect(0, 0, this._getWidth(), this._getHeight())
            }
            ,
            n.prototype._getWidth = function() {
                return this.size
            }
            ,
            n.prototype._getHeight = function() {
                return this.size
            }
            ,
            n.prototype._getCanvasHeight = function() {
                return "semi" == this.type ? .65 * this._getHeight() : "arch" == this.type ? .8 * this._getHeight() : "full" == this.type ? this._getHeight() : void 0
            }
            ,
            n.prototype._getRadius = function() {
                return this._getCenter().x - 2 * this.thick
            }
            ,
            n.prototype._getCenter = function() {
                return {
                    x: this._getWidth() / 2,
                    y: this._getHeight() / 2
                }
            }
            ,
            n.prototype._init = function() {
                this._context = this._canvas.nativeElement.getContext("2d"),
                this._initialized = !0,
                this._updateSize(),
                this._setupStyles(),
                this._repaint()
            }
            ,
            n.prototype._destroy = function() {
                this._clear(),
                this._context = null
            }
            ,
            n.prototype._setupStyles = function() {
                this._context.canvas.width = this._getWidth(),
                this._context.canvas.height = this._getCanvasHeight(),
                this._context.lineCap = this.cap,
                this._context.lineWidth = this.thick
            }
            ,
            n.prototype._repaint = function() {
                this._clear(),
                this._draw()
            }
            ,
            n
        }()
    },
    194: function(n, l, t) {
        "use strict";
        t.d(l, "a", function() {
            return r
        });
        t(3);
        var e = t(35)
          , u = t.n(e)
          , i = (t(147),
        t(104))
          , o = {
            connect: {
                text: "Connecting...",
                class: "Good",
                icon: "checkmark"
            },
            OK: {
                text: "All hardware OK",
                class: "Good",
                icon: "checkmark"
            },
            Start: {
                text: "Starting up",
                class: "Good",
                icon: "checkmark"
            },
            Sleep: {
                text: "Thermostat disabled",
                class: "OK",
                icon: "checkmark"
            },
            ota: {
                text: "Updating firmware",
                class: "OK",
                icon: "cloud-download"
            },
            RSSI: {
                text: "Weak WiFi signal",
                class: "MayCheck",
                icon: "alert"
            },
            socket: {
                text: "Disconnected from server; reconnecting...",
                class: "MayCheck",
                icon: "alert"
            },
            server: {
                text: "Can't connect to server",
                class: "Check",
                icon: "warning"
            },
            offline: {
                text: "CoolBot is offline",
                class: "Check",
                icon: "warning"
            },
            Room: {
                text: "Room sensor error",
                class: "Check",
                icon: "warning"
            },
            Fins: {
                text: "Fins sensor error",
                class: "Check",
                icon: "warning"
            },
            Heater: {
                text: "Heater error",
                class: "Check",
                icon: "warning"
            },
            Hardware: {
                text: "Hardware error",
                class: "Check",
                icon: "warning"
            },
            Hot: {
                text: "Room temp is too hot",
                class: "Bad",
                icon: "warning"
            },
            Cold: {
                text: "Room temp is too cold",
                class: "Bad",
                icon: "warning"
            },
            warnHot: {
                text: "Room temp briefly high",
                class: "MayCheck",
                icon: "alert"
            },
            warnCold: {
                text: "Room temp briefly low",
                class: "MayCheck",
                icon: "alert"
            },
            wasHot: {
                text: "Room temp was high",
                class: "MayCheck",
                icon: "alert"
            },
            wasCold: {
                text: "Room temp was low",
                class: "MayCheck",
                icon: "alert"
            },
            warnComm: {
                text: "CoolBot briefly offline",
                class: "MayCheck",
                icon: "alert"
            }
        }
          , a = [-5, 10]
          , r = function() {
            function n(n, l) {
                this.blynk = n,
                this.masquerade = l,
                this.showPinData = !0,
                this.pinToShow = "",
                this.gaugeShowAll = !1,
                this.roomColor = "#1DAF3A",
                this.finsColor = "#1d60af",
                this.minGaugeTemp = new i.a(20),
                this.maxGaugeTemp = new i.a(80)
            }
            return l = n,
            n.prototype.getUnits = function() {
                return i.a.strUnits()
            }
            ,
            n.prototype.ngOnInit = function() {
                this.tempChart.setDisplayStrFunc(l.tempToString),
                this.tempChart.setUnitConverter(l.tempConvert),
                this.chartUnits = this.getUnits()
            }
            ,
            n.prototype.ngAfterViewInit = function() {
                this.changeChartPin(),
                this.initChart()
            }
            ,
            n.prototype.getStatusCode = function(n) {
                return n in o ? o[this.tweakStatus(n)] : {
                    text: "",
                    class: "",
                    icon: ""
                }
            }
            ,
            n.prototype.getShowRefresh = function() {
                return "server" == this.device.status || "socket" == this.device.status
            }
            ,
            n.prototype.getNotifyStatusClass = function() {
                return this.device.notifyOn && (this.device.notifyEmailOn || this.device.notifySmsOn) ? "notifyStatus notifyStatusOn" : "notifyStatus notifyStatusOff"
            }
            ,
            n.prototype.getNotifyType = function() {
                return this.device.notifyOn ? this.device.notifyEmailOn ? this.device.notifySmsOn ? "Email & SMS" : "Email" : this.device.notifySmsOn ? "SMS" : "Off" : "Off"
            }
            ,
            n.prototype.clickRefresh = function() {
                this.blynk.doLogin()
            }
            ,
            n.prototype.tweakStatus = function(n) {
                if (this.device.inactiveMs > 2e4 && this.device.observingMs > 2e4 && "OK" == n)
                    return "warnComm";
                if ("offline" == n && !this.device.offlineFlag)
                    return "warnComm";
                if (!this.device.powerOn)
                    return "Sleep";
                var l = this.device.roomTemp.getF();
                return l >= this.device.tooHotTemp.getF() && "OK" == n ? "warnHot" : l <= this.device.tooColdTemp.getF() && "OK" == n ? "warnCold" : l < this.device.tooHotTemp.getF() && "Hot" == n ? "wasHot" : l > this.device.tooColdTemp.getF() && "Cold" == n ? "wasCold" : n
            }
            ,
            n.prototype.roomGaugeOpacity = function() {
                return u.a.includes(["OK", "RSSI", "Fins", "Heater", "Hot", "Cold", "warnHot", "warnCold", "wasHot", "wasCold"], this.tweakStatus(this.device.status)) ? 1 : .4
            }
            ,
            n.tempToString = function(n, l) {
                var t = Number(n).toLocaleString([], {
                    maximumFractionDigits: 1
                });
                return l && (t += i.a.celsiusMode() ? " °C" : " °F"),
                t
            }
            ,
            n.tempConvert = function(n) {
                return i.a.FtoDisplay(n)
            }
            ,
            n.prototype.initChart = function() {
                var n = [{
                    label: "Room Temp",
                    minRange: [i.a.FtoDisplay(this.device.tooColdTemp.getF() + a[0]), i.a.FtoDisplay(this.device.tooHotTemp.getF() + a[1])],
                    color: this.roomColor,
                    opacity: .25,
                    showLine: !0,
                    showArea: !this.device.notifyOn,
                    showPoints: !1
                }];
                this.lastMarkers = this.getTempChartMarkers(),
                this.lastShadedAreas = this.getTempChartShadedAreas(),
                this.tempChart.initDatasets(n, !1, 30, this.lastMarkers, this.lastShadedAreas)
            }
            ,
            n.prototype.initPinChart = function() {
                var n = this;
                if (this.showPinData && "" != this.pinToShow) {
                    this.pinChart.initDatasets([{
                        color: "#8af",
                        opacity: .25,
                        showLine: !1,
                        showArea: !1,
                        showPoints: !0
                    }]),
                    setTimeout(function() {
                        return n.pinChartHolder.nativeElement.scrollIntoView({
                            behavior: "smooth",
                            block: "end"
                        })
                    }, 300)
                }
            }
            ,
            n.prototype.changeChartPin = function() {
                var n = this;
                setTimeout(function() {
                    return n.initPinChart()
                })
            }
            ,
            n.prototype.reInitIfChanged = function() {
                var n = this;
                return (this.chartUnits != this.getUnits() || !u.a.isEqual(this.lastMarkers, this.getTempChartMarkers()) || !u.a.isEqual(this.lastShadedAreas, this.getTempChartShadedAreas())) && (this.chartUnits = this.getUnits(),
                setTimeout(function() {
                    return n.initChart()
                }),
                !0)
            }
            ,
            n.prototype.getTempChartMarkers = function() {
                return [{
                    value: this.device.setTemp.getDisp(),
                    displayName: "Set point",
                    axis: 1,
                    drawLine: !0,
                    color: void 0,
                    includeInRange: !0
                }, {
                    value: this.device.tooColdTemp.getDisp(),
                    displayName: "Notification low threshold",
                    axis: 1,
                    drawLine: !0,
                    color: "steelblue",
                    includeInRange: !0
                }, {
                    value: this.device.tooHotTemp.getDisp(),
                    displayName: "Notification high threshold",
                    axis: 1,
                    drawLine: !0,
                    color: "tomato",
                    includeInRange: !0
                }]
            }
            ,
            n.prototype.getTempChartShadedAreas = function() {
                return [{
                    value: this.device.tooColdTemp.getDisp(),
                    displayName: "Temp too low",
                    color: "steelblue",
                    directionUp: !1
                }, {
                    value: this.device.tooHotTemp.getDisp(),
                    displayName: "Temp too high",
                    color: "tomato",
                    directionUp: !0
                }]
            }
            ,
            n.prototype.updateBasicSettings = function() {
                var n = this;
                setTimeout(function() {
                    n.tempChart && n.tempChart.setMarkers(n.getTempChartMarkers(), n.getTempChartShadedAreas())
                })
            }
            ,
            n;
            var l
        }()
    },
    195: function(n, l, t) {
        "use strict";
        t.d(l, "a", function() {
            return e
        });
        t(3);
        var e = function() {
            function n() {
                this.tip_title = "",
                this.tip_text = "",
                this.show = !1
            }
            return n.prototype.togglePopover = function() {
                var n = this;
                this.show = !this.show,
                this.show && setTimeout(function() {
                    return n.contentCard.nativeElement.scrollIntoView({
                        behavior: "smooth",
                        block: "end"
                    })
                }, 300)
            }
            ,
            n
        }()
    },
    197: function(n, l, t) {
        "use strict";
        t.d(l, "a", function() {
            return e
        });
        t(3),
        t(193),
        t(402);
        var e = function() {
            return function() {}
        }()
    },
    200: function(n, l, t) {
        "use strict";
        t.d(l, "a", function() {
            return e
        });
        t(3),
        t(13);
        var e = function() {
            return function() {}
        }()
    },
    201: function(n, l, t) {
        "use strict";
        t.d(l, "a", function() {
            return e
        });
        t(3),
        t(13);
        var e = function() {
            return function() {}
        }()
    },
    202: function(n, l, t) {
        "use strict";
        t.d(l, "a", function() {
            return e
        });
        t(3),
        t(13);
        var e = function() {
            return function() {}
        }()
    },
    203: function(n, l, t) {
        "use strict";
        t.d(l, "a", function() {
            return e
        });
        t(3),
        t(13),
        t(408);
        var e = function() {
            return function() {}
        }()
    },
    204: function(n, l, t) {
        "use strict";
        t.d(l, "a", function() {
            return u
        });
        t(3);
        var e = t(16)
          , u = (t(13),
        function() {
            function n(n, l, t, u, i, o, a) {
                this.navCtrl = n,
                this.navParams = l,
                this.http = t,
                this.blynk = u,
                this.subs = i,
                this.onboarding = o,
                this.formBuilder = a;
                this.demographics = this.formBuilder.group({
                    firstname: [],
                    lastname: [],
                    mobilephone: ["", u.isPhoneNumberValid],
                    email: [this.blynk.account],
                    primary_use: [],
                    how_did_you_hear_about_us: [],
                    cb_pro_purchase_reason: [],
                    cb_wic_purchased: []
                });
                for (var r in this.demographics.controls) {
                    var s = this.demographics.controls[r];
                    s.validator || s.setValidators(e.w.required)
                }
            }
            return n.prototype.ngAfterViewInit = function() {
                this.onboarding.ensureLogin()
            }
            ,
            n.prototype.submitForm = function() {
                var n = this;
                this.errorMessage = "Submitting...";
                var l = {
                    fields: [],
                    skipValidation: !1
                };
                for (var t in this.demographics.value)
                    l.fields.push({
                        name: t,
                        value: this.demographics.value[t] || ""
                    });
                console.log("Form submitted:", l),
                this.http.post("https://api.hsforms.com/submissions/v3/integration/submit/2434330/19a8a8e8-4512-44d6-b427-0994b8d9a1b7", l).subscribe(function(l) {
                    n.subs.demographicsLogged(n.demographics.value).catch(function(l) {
                        return n.errorMessage = "Error logging data."
                    }).then(function() {
                        return n.onboarding.updatePage()
                    })
                }, function(l) {
                    n.errorMessage = "Error saving data.",
                    console.log(l)
                })
            }
            ,
            n.prototype.onSkip = function() {
                var n = this;
                this.subs.demographicsLogged(this.demographics.value).catch(function(n) {
                    return null
                }).then(function() {
                    return n.onboarding.updatePage()
                })
            }
            ,
            n
        }())
    },
    205: function(n, l, t) {
        "use strict";
        t.d(l, "a", function() {
            return e
        });
        t(3),
        t(13);
        var e = function() {
            return function() {}
        }()
    },
    206: function(n, l, t) {
        "use strict";
        t.d(l, "a", function() {
            return e
        });
        t(3),
        t(13);
        var e = function() {
            return function() {}
        }()
    },
    207: function(n, l, t) {
        "use strict";
        t.d(l, "a", function() {
            return e
        });
        t(3),
        t(13),
        t(408);
        var e = function() {
            return function() {}
        }()
    },
    208: function(n, l, t) {
        "use strict";
        t.d(l, "a", function() {
            return e
        });
        t(3),
        t(13);
        var e = function() {
            return function() {}
        }()
    },
    209: function(n, l, t) {
        "use strict";
        t.d(l, "a", function() {
            return e
        });
        t(3),
        t(13);
        var e = function() {
            return function() {}
        }()
    },
    221: function(n, l) {
        function t(n) {
            return Promise.resolve().then(function() {
                throw new Error("Cannot find module '" + n + "'.")
            })
        }
        t.keys = function() {
            return []
        }
        ,
        t.resolve = t,
        n.exports = t,
        t.id = 221
    },
    246: function(n, l, t) {
        function e(n) {
            var l = u[n];
            return l ? t.e(l[1]).then(function() {
                return t(l[0])
            }) : Promise.reject(new Error("Cannot find module '" + n + "'."))
        }
        var u = {
            "../pages/develop/develop.module.ngfactory": [528, 11],
            "../pages/devices/devices.module.ngfactory": [529, 10],
            "../pages/login/login.module.ngfactory": [530, 9],
            "../pages/named-settings/named-settings.module.ngfactory": [531, 8],
            "../pages/new-account/new-account.module.ngfactory": [532, 7],
            "../pages/new-device/new-device.module.ngfactory": [533, 6],
            "../pages/profile/profile.module.ngfactory": [535, 5],
            "../pages/referral/referral.module.ngfactory": [534, 4],
            "../pages/register/register.module.ngfactory": [536, 3],
            "../pages/reset-instructions/reset-instructions.module.ngfactory": [537, 2],
            "../pages/setup-mode-instructions/setup-mode-instructions.module.ngfactory": [538, 1],
            "../pages/support/support.module.ngfactory": [539, 0]
        };
        e.keys = function() {
            return Object.keys(u)
        }
        ,
        e.id = 246,
        n.exports = e
    },
    32: function(n, l, t) {
        "use strict";
        t.d(l, "a", function() {
            return e
        });
        t(3),
        t(171);
        var e = function() {
            function n(n, l) {
                this.storage = n,
                this.SETTINGS_KEY = "_settings",
                this._defaults = l
            }
            return n.prototype.load = function() {
                var n = this;
                return this.storage.get(this.SETTINGS_KEY).then(function(l) {
                    return l ? (n.settings = l,
                    n._mergeDefaults(n._defaults)) : n.setAll(n._defaults).then(function(l) {
                        n.settings = l
                    })
                })
            }
            ,
            n.prototype.isLoaded = function() {
                return void 0 !== this.settings
            }
            ,
            n.prototype.loadIfNeeded = function() {
                return this.isLoaded() ? Promise.resolve(this.settings) : this.load()
            }
            ,
            n.prototype._mergeDefaults = function(n) {
                for (var l in n)
                    l in this.settings || (this.settings[l] = n[l]);
                return this.setAll(this.settings)
            }
            ,
            n.prototype.merge = function(n) {
                for (var l in n)
                    this.settings[l] = n[l];
                return this.save()
            }
            ,
            n.prototype.setValue = function(n, l) {
                var t = this;
                return this.loadIfNeeded().then(function() {
                    return t.settings[n] = l,
                    t.storage.set(t.SETTINGS_KEY, t.settings)
                })
            }
            ,
            n.prototype.setAll = function(n) {
                return this.storage.set(this.SETTINGS_KEY, n)
            }
            ,
            n.prototype.getValue = function(n) {
                return this.loadIfNeeded().then(function(l) {
                    return l[n]
                })
            }
            ,
            n.prototype.save = function() {
                var n = this;
                return this.loadIfNeeded().then(function(l) {
                    return n.setAll(n.settings)
                })
            }
            ,
            Object.defineProperty(n.prototype, "allSettings", {
                get: function() {
                    return this.settings
                },
                enumerable: !0,
                configurable: !0
            }),
            n
        }()
    },
    36: function(n, l, t) {
        "use strict";
        t.d(l, "a", function() {
            return e
        });
        t(3);
        var e = function() {
            function n(n, l) {
                var t = this;
                this.blynk = n,
                this.onboarding = l,
                this._masquerading = !1,
                this.blynk.accountLoggedIn$.subscribe(function(n) {
                    return t.loadCanMasquerade(n)
                })
            }
            return n.prototype.loadCanMasquerade = function(n) {
                var l = this;
                this._canMasquerade = !1,
                n && this.blynk.getProfile().then(function(n) {
                    return l._canMasquerade = n && n.subscription && n.subscription.canMasquerade
                })
            }
            ,
            Object.defineProperty(n.prototype, "masquerading", {
                get: function() {
                    return this._masquerading
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(n.prototype, "canMasquerade", {
                get: function() {
                    return this._canMasquerade
                },
                enumerable: !0,
                configurable: !0
            }),
            n.prototype.masquerade = function(n) {
                var l = this;
                if (!this.canMasquerade)
                    throw Error("You don't have permission to masquerade.");
                if (!n)
                    throw Error("Enter a user email to masquerade as.");
                return this.targetUser = n.toLocaleLowerCase(),
                this.origUser = this.blynk.account,
                this.origPass = this.blynk.passwordHash,
                console.log("Masquerade logging out."),
                this.blynk.doLogout(!1).then(function() {
                    return l.blynk.setCredentials(l.origUser, l.origPass, l.targetUser),
                    l._masquerading = !0,
                    console.log("Masquerade logging in"),
                    l.blynk.doLoginAndReload().then(function() {
                        return l.onboarding.updatePage()
                    })
                }).catch(function(n) {
                    throw l.stopMasquerading(),
                    Error("Couldn't masquerade to that account.")
                })
            }
            ,
            n.prototype.stopMasquerading = function() {
                var n = this;
                if (console.log("Masquerade logging out"),
                this.blynk.isLoggedIn())
                    return this.blynk.doLogout(!1).then(function() {
                        return n.finishStopMasquerading()
                    });
                var l = this.blynk.waitForDisconnect().then(function() {
                    return n.finishStopMasquerading()
                });
                return this.blynk.breakSocket(),
                l
            }
            ,
            n.prototype.finishStopMasquerading = function() {
                var n = this;
                return this._masquerading = !1,
                this.blynk.setCredentials(this.origUser, this.origPass),
                console.log("Masquerade popping back to " + this.origUser),
                this.blynk.doLoginAndReload().then(function() {
                    return n.onboarding.updatePage()
                })
            }
            ,
            n.prototype.logout = function() {
                this.blynk.doLogout(),
                this._canMasquerade = !1,
                this._masquerading = !1
            }
            ,
            n
        }()
    },
    37: function(n, l, t) {
        "use strict";
        t.d(l, "a", function() {
            return i
        });
        t(3),
        t(13),
        t(15),
        t(105),
        t(52);
        var e = t(149)
          , u = t(77)
          , i = function() {
            function n(n, l, t, e) {
                this.app = n,
                this.blynk = l,
                this.subs = t,
                this.referral = e,
                this.needDemo = !0
            }
            return n.prototype.nav = function() {
                return this.app.getRootNavs()[0]
            }
            ,
            n.prototype.ensureLogin = function() {
                var n = this;
                return this.blynk.isLoggedIn() ? Promise.resolve(!0) : this.blynk.isDead() && this.blynk.canLogIn() ? this.blynk.doLogin().catch(function(l) {
                    return n.updatePage()
                }) : this.updatePage()
            }
            ,
            n.prototype.updatePage = function() {
                var n = this;
                return console.log("Onboarding: updatePage()"),
                this.findPage().then(function(l) {
                    return "TabsPage" == l ? n.nav().setRoot(e.a) : "NewDevicePage" == l ? n.nav().setRoot(u.a) : n.nav().setRoot(l),
                    !0
                })
            }
            ,
            n.prototype.findPage = function() {
                var n = this;
                return this.subs.needDemographics().catch(function(l) {
                    return n.needDemo = !1
                }).then(function(l) {
                    return n.blynk.isLoggedIn() ? (n.needDemo = l,
                    n.needDemo ? "NewAccountPage" : n.blynk.getDevices().then(function(l) {
                        return n.blynk.isDeveloper().then(function(n) {
                            return n || 1 != l.length || 0 != l[0].connectTime || "status"in l[0] && "OFFLINE" != l[0].status ? "TabsPage" : "NewDevicePage"
                        })
                    })) : Promise.resolve("LoginPage")
                })
            }
            ,
            n
        }()
    },
    402: function(n, l, t) {
        "use strict";
        t(3)
    },
    404: function(n, l, t) {
        "use strict";
        t.d(l, "a", function() {
            return d
        });
        var e = t(3)
          , u = (t(13),
        t(35))
          , i = t.n(u)
          , o = (t(32),
        t(104))
          , a = t(86)
          , r = t(15)
          , s = t(147)
          , c = t(70)
          , d = function(n) {
            function l(l, t, e) {
                var u = n.call(this, l, t, e) || this;
                return u.http = l,
                u.settings = t,
                u.appCtrl = e,
                u.haveAnySavedSettings = !1,
                u.onPin("*", s.A, function(n, l) {
                    return u.tweakIfChanged(n, l)
                }),
                u.onPin("*", s.q, function(n, l) {
                    return u.tweakIfChanged(n, l)
                }),
                u.onPin("*", s.s, function(n, l) {
                    return u.tweakIfChanged(n, l)
                }),
                console.log("Starting up: app source version " + c.a + "."),
                u.pinDefaults[s.q] = String(s.g),
                u.pinDefaults[s.p] = "0",
                u.pinDefaults[s.s] = String(s.d),
                u.pinDefaults[s.r] = "0",
                u.pinDefaults[a.h] = "0",
                u.pinDefaults[s.l] = "0",
                u.pinDefaults[s.u] = "1",
                u.pinDefaults[s.w] = "1",
                u.pinDefaults[s.v] = "1",
                u.settings.getValue("celsius").then(function(n) {
                    o.a.SetCelsiusMode("1" == n)
                }),
                u
            }
            return Object(e.__extends)(l, n),
            l.prototype.createDevice = function(n) {
                return new s.a(this,n)
            }
            ,
            l.prototype.isAppProjectUpdated = function(l) {
                if (n.prototype.isAppProjectUpdated.call(this, l))
                    return !0;
                if (l.devices) {
                    return !this.findWidgetTypeForDevice(l, "EVENTOR", l.devices[0].id)
                }
                return !1
            }
            ,
            l.prototype.tweakIfChanged = function(n, l) {
                l && n != l && this.tweakAndSaveProjectSoon()
            }
            ,
            l.prototype.tweakProject = function(l, t) {
                var e = this;
                return console.log("tweakProject(): currentProject = ", l),
                n.prototype.tweakProject.call(this, l, t).then(function(n) {
                    return e.allNotifyEmails().then(function(l) {
                        for (var t = 0, u = e.devices; t < u.length; t++) {
                            e.tweakForDevice(u[t], n)
                        }
                        var o = e.findWidgetType(n, "EMAIL");
                        o.to = o && l ? l : "--";
                        var a = e.findWidgetType(n, "SMS")
                          , r = e.getCachedAccountMetadata();
                        return a && (a.to = r && r.mobileNumber ? r.mobileNumber : ""),
                        i.a.remove(n.widgets, function(n) {
                            return "EVENTOR" == n.type && 0 != n.deviceId && void 0 === i.a.find(e.devices, ["id", n.deviceId])
                        }),
                        console.log("tweakProject(): newProject = ", n),
                        n
                    })
                })
            }
            ,
            l.prototype.tweakForDevice = function(n, l) {
                var t = n.longTitle()
                  , e = t + " is warmer than " + n.tooHotTemp.strAscii() + "."
                  , u = t + " is colder than " + n.tooColdTemp.strAscii() + "."
                  , o = t + " has a problem with its sensors or heater."
                  , a = t + " has a problem with its room temperature sensor."
                  , r = t + " has a problem with its fins temperature sensor."
                  , c = t + " has a problem with its heater."
                  , d = t + " is offline."
                  , h = "\n\nYou can see its current status at https://cb.storeitcold.com."
                  , p = this.tweakWidget(n, l, "EVENTOR")
                  , g = this.findWidgetType(l, "NOTIFICATION");
                n.notifyOn && (g.notifyWhenOffline = !0);
                var f = p ? i.a.find(p.rules, function(n) {
                    return n.triggerPin.pin == String(s.p)
                }) : null
                  , _ = p ? i.a.find(p.rules, function(n) {
                    return n.triggerPin.pin == String(s.r)
                }) : null
                  , m = p ? i.a.find(p.rules, function(n) {
                    return n.triggerPin.pin == String(s.n)
                }) : null
                  , v = p ? i.a.find(p.rules, function(n) {
                    return n.triggerPin.pin == String(s.t)
                }) : null
                  , b = p ? i.a.find(p.rules, function(n) {
                    return n.triggerPin.pin == String(s.m)
                }) : null
                  , y = p ? i.a.find(p.rules, function(n) {
                    return n.triggerPin.pin == String(s.o)
                }) : null
                  , C = p ? i.a.find(p.rules, function(n) {
                    return n.triggerPin.pin == String(g.offlineFlagPin)
                }) : null;
                this.tweakRule(f, n, e, "CoolBot is too hot", h),
                this.tweakRule(_, n, u, "CoolBot is too cold", h),
                m && !v ? this.tweakRule(m, n, o, "CoolBot hardware error", h) : m && (m.isActive = !1,
                m.actions = []),
                this.tweakRule(v, n, a, "CoolBot room sensor error", h),
                this.tweakRule(b, n, r, "CoolBot fins sensor error", h),
                this.tweakRule(y, n, c, "CoolBot heater error", h),
                this.tweakRule(C, n, d, "CoolBot is offline", h);
                for (var w = 0, k = l.widgets; w < k.length; w++) {
                    var P = k[w];
                    P.frequency && void 0 !== P.pin && P.pin >= 0 && 0 == P.deviceId && this.tweakWidget(n, l, P.type, P.pin)
                }
            }
            ,
            l.prototype.tweakWidget = function(n, l, t, e) {
                var u = this.findWidgetTypeAndPinForDevice(l, t, e, 0);
                if (0 == n.id)
                    return u;
                var o = this.findWidgetTypeAndPinForDevice(l, t, e, n.id);
                if (o !== u) {
                    if (o) {
                        var a = o.id;
                        i.a.assign(o, i.a.cloneDeep(u)),
                        o.id = a
                    } else
                        (o = i.a.cloneDeep(u)).id = this.findUnusedWidgetId(l),
                        l.widgets.push(o);
                    o.deviceId = n.id
                }
                return o
            }
            ,
            l.prototype.tweakRule = function(n, l, t, e, u) {
                n && (n.isActive = l.notifyOn,
                n.actions = [],
                l.notifyEmailOn && n.actions.push({
                    type: "MAIL",
                    subject: e,
                    message: t + u
                }),
                l.notifySmsOn && n.actions.push({
                    type: "SMS",
                    message: t
                }))
            }
            ,
            l.prototype.cleanProject = function(l) {
                var t = this;
                return n.prototype.cleanProject.call(this, l).then(function(n) {
                    var l = t.findWidgetType(n, "EMAIL");
                    l && (l.to = "--");
                    var e = t.findWidgetType(n, "SMS");
                    return e && (e.to = ""),
                    n
                })
            }
            ,
            l.prototype.isPhoneNumberValid = function(n) {
                if (!n || "string" != typeof n)
                    return !1;
                return 10 == n.replace(/\D+/g, "").length
            }
            ,
            l.prototype.isEmailValid = function(n) {
                return /^[^@]+@([^@.]+\.)+[^@.]+$/.test(n)
            }
            ,
            l.prototype.sanitizeMobileNumberForViewing = function(n) {
                return n && (n.startsWith("+") && (n = n.substring(1)),
                n.startsWith("1") && (n = n.substring(1)),
                n.startsWith("-") && (n = n.substring(1))),
                n.trim()
            }
            ,
            l.prototype.genericizeMobileNumberForUsage = function(n) {
                return this.isPhoneNumberValid(n) ? "+1-" + n : n
            }
            ,
            l.prototype.getArrayFrom = function(n, l, t) {
                void 0 === t && (t = function(n) {
                    return n
                }
                );
                var e;
                return n && n[l] ? (e = n[l].split(",").map(function(n) {
                    return {
                        val: t(n)
                    }
                })) && e.length || (e = []) : e = [],
                console.log("getArrayFrom(accountMetadata, " + l + ") =", e),
                e
            }
            ,
            l.prototype.setArrayToMetadata = function(n, l, t) {
                void 0 === t && (t = function(n) {
                    return n
                }
                );
                var e = l.map(function(n) {
                    return t(n.val)
                }).join(",");
                console.log("setArrayToMetadata(" + n + ",", l, ")");
                var u = {};
                return u[n] = e,
                this.updateAccountMetadata(u).then(function() {
                    return !0
                })
            }
            ,
            l.prototype.getMobileNumbers = function() {
                var n = this;
                return this.getAccountMetadata().then(function(l) {
                    var t = n.getArrayFrom(l, "mobileNumber", function(l) {
                        return n.sanitizeMobileNumberForViewing(l)
                    });
                    return t && t.length || (t = [{
                        val: ""
                    }]),
                    t
                })
            }
            ,
            l.prototype.setMobileNumbers = function(n) {
                var l = this;
                return this.setArrayToMetadata("mobileNumber", n, function(n) {
                    return l.genericizeMobileNumberForUsage(n)
                })
            }
            ,
            l.prototype.getExtraEmails = function() {
                var n = this;
                return this.getAccountMetadata().then(function(l) {
                    var t = n.getArrayFrom(l, "extraEmails");
                    return console.log("result after getArrayFrom:", t),
                    t
                })
            }
            ,
            l.prototype.setExtraEmails = function(n) {
                return this.setArrayToMetadata("extraEmails", n)
            }
            ,
            l.prototype.allNotifyEmails = function() {
                var n = this;
                return this.getExtraEmails().then(function(l) {
                    return l.length ? [n.account, l.map(function(n) {
                        return n.val
                    }).join()].join() : n.account
                })
            }
            ,
            l.prototype.getObjectFromMetadata = function(n) {
                return this.getAccountMetadata().then(function(l) {
                    var t;
                    return l && l[n] && (t = l[n]),
                    t
                })
            }
            ,
            l.prototype.addObjectToMetadata = function(n, l, t) {
                void 0 === t && (t = !0);
                var e = {};
                return e[n] = l,
                this.updateAccountMetadata(e, t).then(function() {
                    return !0
                })
            }
            ,
            l.prototype.clearSettingsSets = function() {
                var n = this;
                return this.getAccountMetadata().then(function(l) {
                    var t = i.a.omit(i.a.cloneDeep(l), "settings");
                    return n.setAccountMetadata(t)
                })
            }
            ,
            l.prototype.ensureSettingsSchema = function() {
                var n = this;
                return this.getAccountMetadata().then(function(l) {
                    return !i.a.isArray(l.settings) || n.clearSettingsSets()
                })
            }
            ,
            l.prototype.saveSettings = function(n, l) {
                var t = this
                  , e = {};
                return e[l] = n.savedPinValues(),
                this.ensureSettingsSchema().then(function() {
                    return t.addObjectToMetadata("settings", e, !1)
                }).then(function() {
                    return t.haveAnySavedSettings = !0,
                    t.listSavedSettings()
                }).then(function(n) {
                    return console.log("saveSettings: new settings after:", n),
                    !0
                })
            }
            ,
            l.prototype.listSavedSettings = function() {
                return this.getObjectFromMetadata("settings").then(function(n) {
                    return i.a.isArray(n) ? [] : i.a.keys(n)
                })
            }
            ,
            l.prototype.checkSavedSettings = function() {
                var n = this;
                return this.haveAnySavedSettings = !1,
                this.listSavedSettings().then(function(l) {
                    return n.haveAnySavedSettings = Object.keys(l).length > 0,
                    !0
                })
            }
            ,
            l.prototype.restoreSettings = function(n, l) {
                return this.getObjectFromMetadata("settings").then(function(t) {
                    return l in t ? n.restoreSavedPinValues(t[l]) : console.log("couldn't find", l, "in", t),
                    !0
                })
            }
            ,
            l.prototype.removeSettings = function(n) {
                var l = this;
                return this.getAccountMetadata().then(function(t) {
                    var e = i.a.omit(t, "settings");
                    return e.settings = i.a.omit(t.settings, n),
                    l.setAccountMetadata(e).then(function() {
                        l.checkSavedSettings()
                    }).then(function() {
                        return !0
                    })
                })
            }
            ,
            l
        }(r.a)
    },
    405: function(n, l, t) {
        "use strict";
        function e(n) {
            return a._19(0, [(n()(),
            a.Z(0, 0, null, null, 1, "ion-icon", [["item-end", ""], ["name", "arrow-dropright"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), a.Y(1, 147456, [[4, 4]], 0, r.a, [s.a, a.j, a.z], {
                name: [0, "name"]
            }, null)], function(n, l) {
                n(l, 1, 0, "arrow-dropright")
            }, function(n, l) {
                n(l, 0, 0, a._13(l, 1)._hidden)
            })
        }
        function u(n) {
            return a._19(0, [(n()(),
            a.Z(0, 0, null, null, 1, "ion-icon", [["item-end", ""], ["name", "arrow-dropdown"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), a.Y(1, 147456, [[4, 4]], 0, r.a, [s.a, a.j, a.z], {
                name: [0, "name"]
            }, null)], function(n, l) {
                n(l, 1, 0, "arrow-dropdown")
            }, function(n, l) {
                n(l, 0, 0, a._13(l, 1)._hidden)
            })
        }
        function i(n) {
            return a._19(0, [(n()(),
            a.Z(0, 0, [[1, 0], ["panelContent", 1]], null, 3, "div", [], [[24, "@rollInOut", 0]], null, null, null, null)), (n()(),
            a._18(-1, null, ["\n    "])), a._12(null, 0), (n()(),
            a._18(-1, null, ["\n  "]))], null, function(n, l) {
                n(l, 0, 0, void 0)
            })
        }
        function o(n) {
            return a._19(0, [a._16(671088640, 1, {
                panelContent: 0
            }), (n()(),
            a.Z(1, 0, null, null, 21, "div", [], null, null, null, null, null)), (n()(),
            a._18(-1, null, ["\n  "])), (n()(),
            a.Z(3, 0, null, null, 15, "ion-list-header", [["class", "item"]], null, [[null, "click"]], function(n, l, t) {
                var e = !0;
                if ("click" === l) {
                    e = !1 !== n.component.toggleShow() && e
                }
                return e
            }, c.b, c.a)), a.Y(4, 1097728, null, 3, d.a, [h.a, s.a, a.j, a.z, [2, p.a]], null, null), a._16(335544320, 2, {
                contentLabel: 0
            }), a._16(603979776, 3, {
                _buttons: 1
            }), a._16(603979776, 4, {
                _icons: 1
            }), a.Y(8, 16384, null, 0, g.a, [s.a, a.z, a.j, [8, null]], null, null), (n()(),
            a._18(9, 2, ["\n    ", "\n    "])), (n()(),
            a.Z(10, 0, null, 0, 1, "ion-icon", [["item-start", ""], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), a.Y(11, 147456, [[4, 4]], 0, r.a, [s.a, a.j, a.z], {
                name: [0, "name"]
            }, null), (n()(),
            a._18(-1, 2, ["\n    "])), (n()(),
            a.U(16777216, null, 4, 1, null, e)), a.Y(14, 16384, null, 0, f.i, [a.I, a.F], {
                ngIf: [0, "ngIf"]
            }, null), (n()(),
            a._18(-1, 2, ["\n    "])), (n()(),
            a.U(16777216, null, 4, 1, null, u)), a.Y(17, 16384, null, 0, f.i, [a.I, a.F], {
                ngIf: [0, "ngIf"]
            }, null), (n()(),
            a._18(-1, 2, ["\n  "])), (n()(),
            a._18(-1, null, ["\n\n  "])), (n()(),
            a.U(16777216, null, null, 1, null, i)), a.Y(21, 16384, null, 0, f.i, [a.I, a.F], {
                ngIf: [0, "ngIf"]
            }, null), (n()(),
            a._18(-1, null, ["\n"])), (n()(),
            a._18(-1, null, ["\n"]))], function(n, l) {
                var t = l.component;
                n(l, 11, 0, t.icon);
                n(l, 14, 0, !t.show);
                n(l, 17, 0, t.show);
                n(l, 21, 0, t.show)
            }, function(n, l) {
                n(l, 9, 0, l.component.item_title);
                n(l, 10, 0, a._13(l, 11)._hidden)
            })
        }
        t.d(l, "a", function() {
            return _
        }),
        l.b = o;
        var a = t(0)
          , r = t(27)
          , s = t(2)
          , c = t(38)
          , d = t(18)
          , h = t(17)
          , p = t(28)
          , g = t(126)
          , f = t(10)
          , _ = a.X({
            encapsulation: 2,
            styles: [],
            data: {
                animation: [{
                    type: 7,
                    name: "rollInOut",
                    definitions: [{
                        type: 1,
                        expr: ":enter",
                        animation: [{
                            type: 6,
                            styles: {
                                height: 0,
                                overflow: "hidden"
                            },
                            offset: null
                        }, {
                            type: 4,
                            styles: {
                                type: 6,
                                styles: {
                                    height: "*"
                                },
                                offset: null
                            },
                            timings: "300ms ease-out"
                        }],
                        options: null
                    }, {
                        type: 1,
                        expr: ":leave",
                        animation: [{
                            type: 4,
                            styles: {
                                type: 6,
                                styles: {
                                    height: 0,
                                    overflow: "hidden"
                                },
                                offset: null
                            },
                            timings: "300ms ease-out"
                        }],
                        options: null
                    }],
                    options: {}
                }]
            }
        })
    },
    407: function(n, l, t) {
        "use strict";
        function e(n) {
            return o._19(0, [(n()(),
            o.Z(0, 0, null, null, 4, "button", [["clear", ""], ["color", "dark"], ["ion-button", ""], ["item-right", ""], ["large", ""], ["type", "button"]], null, [[null, "click"]], function(n, l, t) {
                var e = !0;
                if ("click" === l) {
                    e = !1 !== n.component.toggle() && e
                }
                return e
            }, a.b, a.a)), o.Y(1, 1097728, null, 0, r.a, [[8, ""], s.a, o.j, o.z], {
                color: [0, "color"],
                large: [1, "large"],
                clear: [2, "clear"]
            }, null), (n()(),
            o._18(-1, 0, [" "])), (n()(),
            o.Z(3, 0, null, 0, 1, "ion-icon", [["name", "ios-eye-off-outline"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), o.Y(4, 147456, null, 0, c.a, [s.a, o.j, o.z], {
                name: [0, "name"]
            }, null)], function(n, l) {
                n(l, 1, 0, "dark", "", "");
                n(l, 4, 0, "ios-eye-off-outline")
            }, function(n, l) {
                n(l, 3, 0, o._13(l, 4)._hidden)
            })
        }
        function u(n) {
            return o._19(0, [(n()(),
            o.Z(0, 0, null, null, 4, "button", [["clear", ""], ["color", "dark"], ["ion-button", ""], ["item-right", ""], ["large", ""], ["type", "button"]], null, [[null, "click"]], function(n, l, t) {
                var e = !0;
                if ("click" === l) {
                    e = !1 !== n.component.toggle() && e
                }
                return e
            }, a.b, a.a)), o.Y(1, 1097728, null, 0, r.a, [[8, ""], s.a, o.j, o.z], {
                color: [0, "color"],
                large: [1, "large"],
                clear: [2, "clear"]
            }, null), (n()(),
            o._18(-1, 0, [" "])), (n()(),
            o.Z(3, 0, null, 0, 1, "ion-icon", [["name", "ios-eye-outline"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), o.Y(4, 147456, null, 0, c.a, [s.a, o.j, o.z], {
                name: [0, "name"]
            }, null)], function(n, l) {
                n(l, 1, 0, "dark", "", "");
                n(l, 4, 0, "ios-eye-outline")
            }, function(n, l) {
                n(l, 3, 0, o._13(l, 4)._hidden)
            })
        }
        function i(n) {
            return o._19(0, [(n()(),
            o.Z(0, 0, null, null, 7, "div", [], null, null, null, null, null)), (n()(),
            o._18(-1, null, ["\n  "])), (n()(),
            o.U(16777216, null, null, 1, null, e)), o.Y(3, 16384, null, 0, d.i, [o.I, o.F], {
                ngIf: [0, "ngIf"]
            }, null), (n()(),
            o._18(-1, null, ["\n  "])), (n()(),
            o.U(16777216, null, null, 1, null, u)), o.Y(6, 16384, null, 0, d.i, [o.I, o.F], {
                ngIf: [0, "ngIf"]
            }, null), (n()(),
            o._18(-1, null, ["\n"])), (n()(),
            o._18(-1, null, ["\n"]))], function(n, l) {
                var t = l.component;
                n(l, 3, 0, "password" == t.inputType);
                n(l, 6, 0, "text" == t.inputType)
            }, null)
        }
        t.d(l, "a", function() {
            return h
        }),
        l.b = i;
        var o = t(0)
          , a = t(20)
          , r = t(14)
          , s = t(2)
          , c = t(27)
          , d = t(10)
          , h = o.X({
            encapsulation: 2,
            styles: [],
            data: {}
        })
    },
    421: function(n, l, t) {
        "use strict";
        function e(n) {
            return r._19(0, [(n()(),
            r.Z(0, 0, null, null, 2, "ion-badge", [], null, null, null, null, null)), r.Y(1, 16384, null, 0, s.a, [c.a, r.j, r.z], null, null), (n()(),
            r._18(-1, null, ["Master"]))], null, null)
        }
        function u(n) {
            return r._19(0, [(n()(),
            r.Z(0, 0, null, null, 1, "span", [], null, null, null, null, null)), (n()(),
            r._18(1, null, [" from ", ""]))], null, function(n, l) {
                n(l, 1, 0, l.parent.context.$implicit.parentId)
            })
        }
        function i(n) {
            return r._19(0, [(n()(),
            r.Z(0, 0, null, null, 2, "button", [["ion-button", ""], ["item-end", ""], ["outline", ""]], null, [[null, "click"]], function(n, l, t) {
                var e = !0;
                if ("click" === l) {
                    e = !1 !== n.component.update(n.parent.context.$implicit.id) && e
                }
                return e
            }, d.b, d.a)), r.Y(1, 1097728, [[3, 4]], 0, h.a, [[8, ""], c.a, r.j, r.z], {
                outline: [0, "outline"]
            }, null), (n()(),
            r._18(-1, 0, ["\n            Update\n          "]))], function(n, l) {
                n(l, 1, 0, "")
            }, null)
        }
        function o(n) {
            return r._19(0, [(n()(),
            r.Z(0, 0, null, null, 19, "ion-item", [["class", "item item-block"]], null, null, null, p.b, p.a)), r.Y(1, 1097728, null, 3, g.a, [f.a, c.a, r.j, r.z, [2, _.a]], null, null), r._16(335544320, 2, {
                contentLabel: 0
            }), r._16(603979776, 3, {
                _buttons: 1
            }), r._16(603979776, 4, {
                _icons: 1
            }), r.Y(5, 16384, null, 0, m.a, [], null, null), (n()(),
            r._18(-1, 2, ["\n          "])), (n()(),
            r.Z(7, 0, null, 1, 8, "ion-label", [], null, null, null, null, null)), r.Y(8, 16384, [[2, 4]], 0, v.a, [c.a, r.j, r.z, [8, null], [8, null], [8, null], [8, null]], null, null), (n()(),
            r._18(9, null, ["", "\n            "])), (n()(),
            r.U(16777216, null, null, 1, null, e)), r.Y(11, 16384, null, 0, b.i, [r.I, r.F], {
                ngIf: [0, "ngIf"]
            }, null), (n()(),
            r._18(12, null, ["\n            (", ""])), (n()(),
            r.U(16777216, null, null, 1, null, u)), r.Y(14, 16384, null, 0, b.i, [r.I, r.F], {
                ngIf: [0, "ngIf"]
            }, null), (n()(),
            r._18(-1, null, [")\n          "])), (n()(),
            r._18(-1, 2, ["\n          "])), (n()(),
            r.U(16777216, null, 4, 1, null, i)), r.Y(18, 16384, null, 0, b.i, [r.I, r.F], {
                ngIf: [0, "ngIf"]
            }, null), (n()(),
            r._18(-1, 2, ["\n        "]))], function(n, l) {
                n(l, 11, 0, !l.context.$implicit.isPreview);
                n(l, 14, 0, l.context.$implicit.parentId > -1);
                n(l, 18, 0, l.context.$implicit.isPreview)
            }, function(n, l) {
                n(l, 9, 0, l.context.$implicit.name);
                n(l, 12, 0, l.context.$implicit.id)
            })
        }
        function a(n) {
            return r._19(0, [(n()(),
            r._18(-1, null, ["\n"])), (n()(),
            r.Z(1, 0, null, null, 22, "ion-header", [], null, null, null, null, null)), r.Y(2, 16384, null, 0, y.a, [c.a, r.j, r.z, [2, C.a]], null, null), (n()(),
            r._18(-1, null, ["\n\n  "])), (n()(),
            r.Z(4, 0, null, null, 18, "ion-navbar", [["class", "toolbar"]], [[8, "hidden", 0], [2, "statusbar-padding", null]], null, null, w.b, w.a)), r.Y(5, 49152, null, 0, k.a, [P.a, [2, C.a], [2, S.a], c.a, r.j, r.z], null, null), (n()(),
            r._18(-1, 3, ["\n    "])), (n()(),
            r.Z(7, 0, null, 0, 10, "ion-buttons", [["left", ""]], null, null, null, null, null)), r.Y(8, 16384, null, 1, T.a, [c.a, r.j, r.z, [2, E.a], [2, k.a]], null, null), r._16(603979776, 1, {
                _buttons: 1
            }), (n()(),
            r._18(-1, null, ["\n      "])), (n()(),
            r.Z(11, 0, null, null, 5, "button", [["icon-only", ""], ["ion-button", ""]], null, [[null, "click"]], function(n, l, t) {
                var e = !0;
                if ("click" === l) {
                    e = !1 !== n.component.closeDev() && e
                }
                return e
            }, d.b, d.a)), r.Y(12, 1097728, [[1, 4]], 0, h.a, [[8, ""], c.a, r.j, r.z], null, null), (n()(),
            r._18(-1, 0, ["\n        "])), (n()(),
            r.Z(14, 0, null, 0, 1, "ion-icon", [["name", "arrow-back"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), r.Y(15, 147456, null, 0, Y.a, [c.a, r.j, r.z], {
                name: [0, "name"]
            }, null), (n()(),
            r._18(-1, 0, ["\n      "])), (n()(),
            r._18(-1, null, ["\n    "])), (n()(),
            r._18(-1, 3, ["\n    "])), (n()(),
            r.Z(19, 0, null, 3, 2, "ion-title", [], null, null, null, I.b, I.a)), r.Y(20, 49152, null, 0, x.a, [c.a, r.j, r.z, [2, E.a], [2, k.a]], null, null), (n()(),
            r._18(-1, 0, ["Developer Tools"])), (n()(),
            r._18(-1, 3, ["\n  "])), (n()(),
            r._18(-1, null, ["\n\n"])), (n()(),
            r._18(-1, null, ["\n\n"])), (n()(),
            r.Z(25, 0, null, null, 61, "ion-content", [["padding", ""]], [[2, "statusbar-padding", null], [2, "has-refresher", null]], null, null, j.b, j.a)), r.Y(26, 4374528, null, 0, D.a, [c.a, A.a, Z.a, r.j, r.z, P.a, N.a, r.u, [2, C.a], [2, S.a]], null, null), (n()(),
            r._18(-1, 1, ["\n  "])), (n()(),
            r.Z(28, 0, null, 1, 17, "ion-card", [], null, null, null, null, null)), r.Y(29, 16384, null, 0, O.a, [c.a, r.j, r.z], null, null), (n()(),
            r._18(-1, null, ["\n    "])), (n()(),
            r.Z(31, 0, null, null, 2, "ion-card-header", [], null, null, null, null, null)), r.Y(32, 16384, null, 0, M.a, [c.a, r.j, r.z], null, null), (n()(),
            r._18(-1, null, ["\n      Projects\n    "])), (n()(),
            r._18(-1, null, ["\n    "])), (n()(),
            r.Z(35, 0, null, null, 9, "ion-card-content", [], null, null, null, null, null)), r.Y(36, 16384, null, 0, R.a, [c.a, r.j, r.z], null, null), (n()(),
            r._18(-1, null, ["\n      "])), (n()(),
            r.Z(38, 0, null, null, 5, "ion-list", [], null, null, null, null, null)), r.Y(39, 16384, null, 0, z.a, [c.a, r.j, r.z, A.a, F.l, Z.a], null, null), (n()(),
            r._18(-1, null, ["\n        "])), (n()(),
            r.U(16777216, null, null, 1, null, o)), r.Y(42, 802816, null, 0, b.h, [r.I, r.F, r.p], {
                ngForOf: [0, "ngForOf"]
            }, null), (n()(),
            r._18(-1, null, ["\n      "])), (n()(),
            r._18(-1, null, ["\n    "])), (n()(),
            r._18(-1, null, ["\n  "])), (n()(),
            r._18(-1, 1, ["\n\n  "])), (n()(),
            r.Z(47, 0, null, 1, 38, "ion-card", [], null, null, null, null, null)), r.Y(48, 16384, null, 0, O.a, [c.a, r.j, r.z], null, null), (n()(),
            r._18(-1, null, ["\n    "])), (n()(),
            r.Z(50, 0, null, null, 23, "ion-card-header", [], null, null, null, null, null)), r.Y(51, 16384, null, 0, M.a, [c.a, r.j, r.z], null, null), (n()(),
            r._18(-1, null, ["\n      "])), (n()(),
            r.Z(53, 0, null, null, 19, "ion-row", [["class", "row"]], null, null, null, null, null)), r.Y(54, 16384, null, 0, L.a, [], null, null), (n()(),
            r._18(-1, null, ["\n        "])), (n()(),
            r.Z(56, 0, null, null, 2, "ion-col", [["class", "col"]], null, null, null, null, null)), r.Y(57, 16384, null, 0, U.a, [], null, null), (n()(),
            r._18(-1, null, ["\n          Project JSON\n        "])), (n()(),
            r._18(-1, null, ["\n        "])), (n()(),
            r.Z(60, 0, null, null, 11, "ion-col", [["class", "col"]], null, null, null, null, null)), r.Y(61, 16384, null, 0, U.a, [], null, null), (n()(),
            r._18(-1, null, ["\n          "])), (n()(),
            r.Z(63, 0, null, null, 7, "ion-buttons", [["right", ""]], null, null, null, null, null)), r.Y(64, 16384, null, 1, T.a, [c.a, r.j, r.z, [2, E.a], [2, k.a]], null, null), r._16(603979776, 5, {
                _buttons: 1
            }), (n()(),
            r._18(-1, null, ["\n            "])), (n()(),
            r.Z(67, 0, null, null, 2, "button", [["ion-button", ""], ["outline", ""], ["small", ""]], null, [[null, "click"]], function(n, l, t) {
                var e = !0;
                if ("click" === l) {
                    e = !1 !== n.component.saveProject() && e
                }
                return e
            }, d.b, d.a)), r.Y(68, 1097728, [[5, 4]], 0, h.a, [[8, ""], c.a, r.j, r.z], {
                small: [0, "small"],
                outline: [1, "outline"]
            }, null), (n()(),
            r._18(-1, 0, ["\n              Save\n            "])), (n()(),
            r._18(-1, null, ["\n          "])), (n()(),
            r._18(-1, null, ["\n        "])), (n()(),
            r._18(-1, null, ["\n      "])), (n()(),
            r._18(-1, null, ["\n    "])), (n()(),
            r._18(-1, null, ["\n    "])), (n()(),
            r.Z(75, 0, null, null, 9, "ion-card-content", [], null, null, null, null, null)), r.Y(76, 16384, null, 0, R.a, [c.a, r.j, r.z], null, null), (n()(),
            r._18(-1, null, ["\n      "])), (n()(),
            r.Z(78, 0, null, null, 5, "ion-textarea", [["autosize", ""], ["rows", "20"]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngModelChange"]], function(n, l, t) {
                var e = !0;
                if ("ngModelChange" === l) {
                    e = !1 !== (n.component.projectSource = t) && e
                }
                return e
            }, H.b, H.a)), r.Y(79, 671744, null, 0, B.q, [[8, null], [8, null], [8, null], [8, null]], {
                model: [0, "model"]
            }, {
                update: "ngModelChange"
            }), r._15(2048, null, B.m, null, [B.q]), r.Y(81, 16384, null, 0, B.n, [B.m], null, null), r.Y(82, 5423104, null, 0, V.a, [c.a, A.a, f.a, P.a, r.j, r.z, [2, D.a], [2, g.a], [2, B.m], Z.a], null, null), (n()(),
            r._18(-1, null, ["\n      "])), (n()(),
            r._18(-1, null, ["\n    "])), (n()(),
            r._18(-1, null, ["\n  "])), (n()(),
            r._18(-1, 1, ["\n"])), (n()(),
            r._18(-1, null, ["\n\n"]))], function(n, l) {
                var t = l.component;
                n(l, 15, 0, "arrow-back");
                n(l, 42, 0, t.projects);
                n(l, 68, 0, "", "");
                n(l, 79, 0, t.projectSource)
            }, function(n, l) {
                n(l, 4, 0, r._13(l, 5)._hidden, r._13(l, 5)._sbPadding);
                n(l, 14, 0, r._13(l, 15)._hidden);
                n(l, 25, 0, r._13(l, 26).statusbarPadding, r._13(l, 26)._hasRefresher);
                n(l, 78, 0, r._13(l, 81).ngClassUntouched, r._13(l, 81).ngClassTouched, r._13(l, 81).ngClassPristine, r._13(l, 81).ngClassDirty, r._13(l, 81).ngClassValid, r._13(l, 81).ngClassInvalid, r._13(l, 81).ngClassPending)
            })
        }
        t.d(l, "a", function() {
            return K
        });
        var r = t(0)
          , s = t(96)
          , c = t(2)
          , d = t(20)
          , h = t(14)
          , p = t(38)
          , g = t(18)
          , f = t(17)
          , _ = t(28)
          , m = t(33)
          , v = t(41)
          , b = t(10)
          , y = t(107)
          , C = t(6)
          , w = t(198)
          , k = t(48)
          , P = t(8)
          , S = t(21)
          , T = t(108)
          , E = t(62)
          , Y = t(27)
          , I = t(419)
          , x = t(109)
          , j = t(72)
          , D = t(23)
          , A = t(5)
          , Z = t(7)
          , N = t(26)
          , O = t(73)
          , M = t(80)
          , R = t(74)
          , z = t(30)
          , F = t(9)
          , L = t(43)
          , U = t(42)
          , H = t(75)
          , B = t(16)
          , V = t(49)
          , q = t(110)
          , W = t(15)
          , G = t(76)
          , $ = r.X({
            encapsulation: 2,
            styles: [],
            data: {}
        })
          , K = r.V("page-develop", q.a, function(n) {
            return r._19(0, [(n()(),
            r.Z(0, 0, null, null, 1, "page-develop", [], null, null, null, a, $)), r.Y(1, 49152, null, 0, q.a, [C.a, W.a, G.a], null, null)], null, null)
        }, {}, {}, [])
    },
    422: function(n, l, t) {
        "use strict";
        function e(n) {
            return S._19(0, [(n()(),
            S.Z(0, 0, [[1, 0], ["card", 1]], null, 22, "ion-card", [["class", "sticky-note"]], null, [[null, "click"]], function(n, l, t) {
                var e = !0;
                if ("click" === l) {
                    e = !1 !== n.component.togglePopover() && e
                }
                return e
            }, null, null)), S.Y(1, 16384, null, 0, R.a, [Y.a, S.j, S.z], null, null), (n()(),
            S._18(-1, null, ["\n\n    "])), (n()(),
            S.Z(3, 0, null, null, 9, "ion-card-header", [], null, null, null, null, null)), S.Y(4, 16384, null, 0, z.a, [Y.a, S.j, S.z], null, null), (n()(),
            S._18(5, null, ["\n      ", "\n      "])), (n()(),
            S.Z(6, 0, null, null, 5, "button", [["float-end", ""], ["ion-button", ""], ["round", ""], ["small", ""]], null, [[null, "click"]], function(n, l, t) {
                var e = !0;
                if ("click" === l) {
                    e = !1 !== n.component.togglePopover() && e
                }
                return e
            }, T.b, T.a)), S.Y(7, 1097728, null, 0, E.a, [[8, ""], Y.a, S.j, S.z], {
                small: [0, "small"],
                round: [1, "round"]
            }, null), (n()(),
            S._18(-1, 0, ["\n        "])), (n()(),
            S.Z(9, 0, null, 0, 1, "ion-icon", [["name", "ios-information-circle-outline"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), S.Y(10, 147456, null, 0, F.a, [Y.a, S.j, S.z], {
                name: [0, "name"]
            }, null), (n()(),
            S._18(-1, 0, ["\n      "])), (n()(),
            S._18(-1, null, ["\n    "])), (n()(),
            S._18(-1, null, ["\n\n    "])), (n()(),
            S.Z(14, 0, null, null, 7, "ion-card-content", [], null, null, null, null, null)), S.Y(15, 16384, null, 0, L.a, [Y.a, S.j, S.z], null, null), (n()(),
            S._18(-1, null, ["\n      "])), (n()(),
            S.Z(17, 0, null, null, 1, "b", [], null, null, null, null, null)), (n()(),
            S._18(18, null, ["", ""])), (n()(),
            S._18(-1, null, ["\n      "])), S._12(null, 0), (n()(),
            S._18(-1, null, ["\n    "])), (n()(),
            S._18(-1, null, ["\n\n  "]))], function(n, l) {
                n(l, 7, 0, "", "");
                n(l, 10, 0, "ios-information-circle-outline")
            }, function(n, l) {
                var t = l.component;
                n(l, 5, 0, t.tip_title);
                n(l, 9, 0, S._13(l, 10)._hidden);
                n(l, 18, 0, t.tip_text)
            })
        }
        function u(n) {
            return S._19(0, [(n()(),
            S.Z(0, 0, null, null, 5, "button", [["ion-button", ""], ["outline", ""], ["round", ""], ["small", ""]], [[8, "title", 0]], [[null, "click"]], function(n, l, t) {
                var e = !0;
                if ("click" === l) {
                    e = !1 !== n.component.togglePopover() && e
                }
                return e
            }, T.b, T.a)), S.Y(1, 1097728, null, 0, E.a, [[8, ""], Y.a, S.j, S.z], {
                small: [0, "small"],
                outline: [1, "outline"],
                round: [2, "round"]
            }, null), (n()(),
            S._18(-1, 0, ["\n    "])), (n()(),
            S.Z(3, 0, null, 0, 1, "ion-icon", [["name", "ios-information-circle-outline"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), S.Y(4, 147456, null, 0, F.a, [Y.a, S.j, S.z], {
                name: [0, "name"]
            }, null), (n()(),
            S._18(-1, 0, ["\n  "]))], function(n, l) {
                n(l, 1, 0, "", "", "");
                n(l, 4, 0, "ios-information-circle-outline")
            }, function(n, l) {
                n(l, 0, 0, S._2(1, "", l.component.tip_text, ""));
                n(l, 3, 0, S._13(l, 4)._hidden)
            })
        }
        function i(n) {
            return S._19(0, [S._16(671088640, 1, {
                contentCard: 0
            }), (n()(),
            S._18(-1, null, ["\n\n  "])), (n()(),
            S.U(16777216, null, null, 1, null, e)), S.Y(3, 16384, null, 0, j.i, [S.I, S.F], {
                ngIf: [0, "ngIf"]
            }, null), (n()(),
            S._18(-1, null, ["\n\n  "])), (n()(),
            S.U(16777216, null, null, 1, null, u)), S.Y(6, 16384, null, 0, j.i, [S.I, S.F], {
                ngIf: [0, "ngIf"]
            }, null), (n()(),
            S._18(-1, null, ["\n"]))], function(n, l) {
                var t = l.component;
                n(l, 3, 0, t.show);
                n(l, 6, 0, !t.show)
            }, null)
        }
        function o(n) {
            return S._19(0, [(n()(),
            S.Z(0, 0, null, null, 4, "div", [], null, null, null, null, null)), (n()(),
            S._18(-1, null, ["\n  "])), (n()(),
            S.Z(2, 0, null, null, 1, "span", [], [[8, "title", 0]], [[null, "tap"]], function(n, l, t) {
                var e = !0;
                if ("tap" === l) {
                    e = !1 !== n.component.toggleLong() && e
                }
                return e
            }, null, null)), (n()(),
            S._18(3, null, ["", ""])), (n()(),
            S._18(-1, null, ["\n"])), (n()(),
            S._18(-1, null, ["\n"]))], null, function(n, l) {
                var t = l.component;
                n(l, 2, 0, S._2(1, "", t.longString, ""));
                n(l, 3, 0, t.shortString)
            })
        }
        function a(n) {
            return S._19(0, [(n()(),
            S.Z(0, 0, null, null, 2, "button", [["block", ""], ["color", "uncertain"], ["ion-button", ""]], [[8, "disabled", 0]], [[null, "click"]], function(n, l, t) {
                var e = !0;
                if ("click" === l) {
                    e = !1 !== n.component.updateFirmware(n.parent.context.$implicit) && e
                }
                return e
            }, T.b, T.a)), S.Y(1, 1097728, null, 0, E.a, [[8, ""], Y.a, S.j, S.z], {
                color: [0, "color"],
                block: [1, "block"]
            }, null), (n()(),
            S._18(2, 0, ["\n              Update Firmware to ", "\n            "]))], function(n, l) {
                n(l, 1, 0, "uncertain", "")
            }, function(n, l) {
                n(l, 0, 0, !l.parent.context.$implicit.isConnected);
                n(l, 2, 0, l.parent.context.$implicit.firmwareUpgrade())
            })
        }
        function r(n) {
            return S._19(0, [(n()(),
            S.Z(0, 0, null, null, 2, "button", [["color", "light"], ["ion-button", ""], ["style", "text-transform:none"]], null, [[null, "click"]], function(n, l, t) {
                var e = !0;
                if ("click" === l) {
                    e = !1 !== n.component.restoreDefaults(n.parent.parent.context.$implicit) && e
                }
                return e
            }, T.b, T.a)), S.Y(1, 1097728, null, 0, E.a, [[8, ""], Y.a, S.j, S.z], {
                color: [0, "color"]
            }, null), (n()(),
            S._18(-1, 0, ["Restore Defaults"]))], function(n, l) {
                n(l, 1, 0, "light")
            }, null)
        }
        function s(n) {
            return S._19(0, [(n()(),
            S.Z(0, 0, null, null, 2, "button", [["color", "light"], ["ion-button", ""], ["style", "text-transform:none"]], null, [[null, "click"]], function(n, l, t) {
                var e = !0;
                if ("click" === l) {
                    e = !1 !== n.component.cancelEdit(n.parent.parent.context.$implicit) && e
                }
                return e
            }, T.b, T.a)), S.Y(1, 1097728, null, 0, E.a, [[8, ""], Y.a, S.j, S.z], {
                color: [0, "color"]
            }, null), (n()(),
            S._18(-1, 0, ["Cancel"]))], function(n, l) {
                n(l, 1, 0, "light")
            }, null)
        }
        function c(n) {
            return S._19(0, [(n()(),
            S.Z(0, 0, null, null, 2, "button", [["block", ""], ["color", "light"], ["ion-button", ""]], null, [[null, "click"]], function(n, l, t) {
                var e = !0;
                if ("click" === l) {
                    e = !1 !== n.component.showSettingsOptions(n.parent.parent.context.$implicit) && e
                }
                return e
            }, T.b, T.a)), S.Y(1, 1097728, null, 0, E.a, [[8, ""], Y.a, S.j, S.z], {
                color: [0, "color"],
                block: [1, "block"]
            }, null), (n()(),
            S._18(-1, 0, ["\n                  Saved Settings...\n                "]))], function(n, l) {
                n(l, 1, 0, "light", "")
            }, null)
        }
        function d(n) {
            return S._19(0, [(n()(),
            S.Z(0, 0, null, null, 2, "button", [["block", ""], ["color", "light"], ["ion-button", ""]], null, [[null, "click"]], function(n, l, t) {
                var e = !0;
                if ("click" === l) {
                    e = !1 !== n.component.saveSettings(n.parent.parent.context.$implicit) && e
                }
                return e
            }, T.b, T.a)), S.Y(1, 1097728, null, 0, E.a, [[8, ""], Y.a, S.j, S.z], {
                color: [0, "color"],
                block: [1, "block"]
            }, null), (n()(),
            S._18(-1, 0, ["\n                  Save Settings\n                "]))], function(n, l) {
                n(l, 1, 0, "light", "")
            }, null)
        }
        function h(n) {
            return S._19(0, [(n()(),
            S.Z(0, 0, null, null, 249, "div", [], null, null, null, null, null)), (n()(),
            S._18(-1, null, ["\n              "])), (n()(),
            S.Z(2, 0, null, null, 246, "expanding-list-item", [["icon", "settings"], ["item_title", "Settings"]], null, null, null, I.b, I.a)), S.Y(3, 49152, null, 0, x.a, [], {
                item_title: [0, "item_title"],
                show: [1, "show"],
                icon: [2, "icon"]
            }, null), (n()(),
            S._18(-1, 0, ["\n                "])), (n()(),
            S.Z(5, 0, null, 0, 11, "div", [["align", "right"]], null, null, null, null, null)), (n()(),
            S._18(-1, null, ["\n                  "])), (n()(),
            S.Z(7, 0, null, null, 2, "button", [["ion-button", ""], ["style", "text-transform:none"]], [[8, "disabled", 0]], [[null, "click"]], function(n, l, t) {
                var e = !0;
                if ("click" === l) {
                    e = !1 !== n.component.toggleEdit(n.parent.context.$implicit) && e
                }
                return e
            }, T.b, T.a)), S.Y(8, 1097728, null, 0, E.a, [[8, ""], Y.a, S.j, S.z], {
                color: [0, "color"]
            }, null), (n()(),
            S._18(9, 0, ["\n                    ", "\n                  "])), (n()(),
            S._18(-1, null, ["\n                  "])), (n()(),
            S.U(16777216, null, null, 1, null, r)), S.Y(12, 16384, null, 0, j.i, [S.I, S.F], {
                ngIf: [0, "ngIf"]
            }, null), (n()(),
            S._18(-1, null, ["\n                  "])), (n()(),
            S.U(16777216, null, null, 1, null, s)), S.Y(15, 16384, null, 0, j.i, [S.I, S.F], {
                ngIf: [0, "ngIf"]
            }, null), (n()(),
            S._18(-1, null, ["\n                "])), (n()(),
            S._18(-1, 0, ["\n\n                "])), (n()(),
            S.Z(18, 0, null, 0, 13, "ion-item", [["class", "item item-block"], ["no-lines", ""]], null, null, null, D.b, D.a)), S.Y(19, 1097728, null, 3, A.a, [Z.a, Y.a, S.j, S.z, [2, N.a]], null, null), S._16(335544320, 7, {
                contentLabel: 0
            }), S._16(603979776, 8, {
                _buttons: 1
            }), S._16(603979776, 9, {
                _icons: 1
            }), S.Y(23, 16384, null, 0, O.a, [], null, null), (n()(),
            S._18(-1, 2, ["\n                  "])), (n()(),
            S.Z(25, 0, null, 1, 2, "ion-label", [["class", "label-tight"]], null, null, null, null, null)), S.Y(26, 16384, [[7, 4]], 0, M.a, [Y.a, S.j, S.z, [8, null], [8, null], [8, null], [8, null]], null, null), (n()(),
            S._18(-1, null, ["Set point:"])), (n()(),
            S._18(-1, 2, ["\n                  "])), (n()(),
            S.Z(29, 0, null, 4, 1, "help-tip", [["item-end", ""], ["tip_text", "The desired target temperature"], ["tip_title", "Set point"]], null, null, null, i, H)), S.Y(30, 49152, null, 0, U.a, [], {
                tip_title: [0, "tip_title"],
                tip_text: [1, "tip_text"]
            }, null), (n()(),
            S._18(-1, 2, ["\n                "])), (n()(),
            S._18(-1, 0, ["\n                "])), (n()(),
            S.Z(33, 0, null, 0, 22, "ion-item", [["class", "item item-block"]], null, null, null, D.b, D.a)), S.Y(34, 1097728, null, 3, A.a, [Z.a, Y.a, S.j, S.z, [2, N.a]], null, null), S._16(335544320, 10, {
                contentLabel: 0
            }), S._16(603979776, 11, {
                _buttons: 1
            }), S._16(603979776, 12, {
                _icons: 1
            }), S.Y(38, 16384, null, 0, O.a, [], null, null), (n()(),
            S._18(-1, 2, ["\n                  "])), (n()(),
            S.Z(40, 0, null, 3, 14, "ion-range", [["class", "range-tight"], ["debounce", "800"], ["pin", "true"], ["step", "1"]], [[2, "range-disabled", null], [2, "range-pressed", null], [2, "range-has-pin", null], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ionChange"]], function(n, l, t) {
                var e = !0;
                if ("ionChange" === l) {
                    e = !1 !== n.component.changeSetPoint(t, n.parent.context.$implicit) && e
                }
                return e
            }, B.b, B.a)), S.Y(41, 1228800, null, 0, V.a, [Z.a, q.a, [2, A.a], Y.a, W.a, S.j, S.z, G.a, S.g], {
                disabled: [0, "disabled"],
                min: [1, "min"],
                max: [2, "max"],
                step: [3, "step"],
                pin: [4, "pin"],
                debounce: [5, "debounce"]
            }, {
                ionChange: "ionChange"
            }), S._15(1024, null, $.l, function(n) {
                return [n]
            }, [V.a]), S.Y(43, 671744, null, 0, $.q, [[8, null], [8, null], [8, null], [2, $.l]], {
                isDisabled: [0, "isDisabled"],
                model: [1, "model"]
            }, null), S._15(2048, null, $.m, null, [$.q]), S.Y(45, 16384, null, 0, $.n, [$.m], null, null), (n()(),
            S._18(-1, null, ["\n                   "])), (n()(),
            S.Z(47, 0, null, 0, 2, "ion-label", [["range-left", ""]], null, null, null, null, null)), S.Y(48, 16384, [[10, 4]], 0, M.a, [Y.a, S.j, S.z, [8, null], [8, null], [8, null], [8, null]], null, null), (n()(),
            S._18(49, null, ["", ""])), (n()(),
            S._18(-1, null, ["\n                   "])), (n()(),
            S.Z(51, 0, null, 1, 2, "ion-label", [["range-right", ""]], null, null, null, null, null)), S.Y(52, 16384, [[10, 4]], 0, M.a, [Y.a, S.j, S.z, [8, null], [8, null], [8, null], [8, null]], null, null), (n()(),
            S._18(53, null, ["", ""])), (n()(),
            S._18(-1, null, ["\n                  "])), (n()(),
            S._18(-1, 2, ["\n                "])), (n()(),
            S._18(-1, 0, ["\n\n                "])), (n()(),
            S.Z(57, 0, null, 0, 17, "ion-item", [["class", "item item-block"], ["no-lines", ""]], null, null, null, D.b, D.a)), S.Y(58, 1097728, null, 3, A.a, [Z.a, Y.a, S.j, S.z, [2, N.a]], null, null), S._16(335544320, 13, {
                contentLabel: 0
            }), S._16(603979776, 14, {
                _buttons: 1
            }), S._16(603979776, 15, {
                _icons: 1
            }), S.Y(62, 16384, null, 0, O.a, [], null, null), (n()(),
            S._18(-1, 2, ["\n                  "])), (n()(),
            S.Z(64, 0, null, 1, 2, "ion-label", [["class", "label-tight"]], null, null, null, null, null)), S.Y(65, 16384, [[13, 4]], 0, M.a, [Y.a, S.j, S.z, [8, null], [8, null], [8, null], [8, null]], null, null), (n()(),
            S._18(-1, null, ["Notifications temp range:"])), (n()(),
            S._18(-1, 2, ["\n                  "])), (n()(),
            S.Z(68, 0, null, 4, 5, "help-tip", [["item-end", ""], ["tip_text", "Send a notification when the room temperature goes outside this range"], ["tip_title", "Notifications temp range"]], null, null, null, i, H)), S.Y(69, 49152, null, 0, U.a, [], {
                tip_title: [0, "tip_title"],
                tip_text: [1, "tip_text"]
            }, null), (n()(),
            S._18(-1, 0, ["\n                    "])), (n()(),
            S.Z(71, 0, null, 0, 1, "p", [], null, null, null, null, null)), (n()(),
            S._18(-1, null, ["Master Notifications toggle must be enabled."])), (n()(),
            S._18(-1, 0, ["\n                  "])), (n()(),
            S._18(-1, 2, ["\n                "])), (n()(),
            S._18(-1, 0, ["\n                "])), (n()(),
            S.Z(76, 0, null, 0, 22, "ion-item", [["class", "item item-block"]], null, null, null, D.b, D.a)), S.Y(77, 1097728, null, 3, A.a, [Z.a, Y.a, S.j, S.z, [2, N.a]], null, null), S._16(335544320, 16, {
                contentLabel: 0
            }), S._16(603979776, 17, {
                _buttons: 1
            }), S._16(603979776, 18, {
                _icons: 1
            }), S.Y(81, 16384, null, 0, O.a, [], null, null), (n()(),
            S._18(-1, 2, ["\n                  "])), (n()(),
            S.Z(83, 0, null, 3, 14, "ion-range", [["class", "range-tight"], ["debounce", "800"], ["dualKnobs", "true"], ["pin", "true"], ["step", "1"]], [[2, "range-disabled", null], [2, "range-pressed", null], [2, "range-has-pin", null], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ionChange"]], function(n, l, t) {
                var e = !0;
                if ("ionChange" === l) {
                    e = !1 !== n.component.changeThreshold(t, n.parent.context.$implicit) && e
                }
                return e
            }, B.b, B.a)), S.Y(84, 1228800, null, 0, V.a, [Z.a, q.a, [2, A.a], Y.a, W.a, S.j, S.z, G.a, S.g], {
                disabled: [0, "disabled"],
                min: [1, "min"],
                max: [2, "max"],
                step: [3, "step"],
                pin: [4, "pin"],
                debounce: [5, "debounce"],
                dualKnobs: [6, "dualKnobs"]
            }, {
                ionChange: "ionChange"
            }), S._15(1024, null, $.l, function(n) {
                return [n]
            }, [V.a]), S.Y(86, 671744, null, 0, $.q, [[8, null], [8, null], [8, null], [2, $.l]], {
                isDisabled: [0, "isDisabled"],
                model: [1, "model"]
            }, null), S._15(2048, null, $.m, null, [$.q]), S.Y(88, 16384, null, 0, $.n, [$.m], null, null), (n()(),
            S._18(-1, null, ["\n                    "])), (n()(),
            S.Z(90, 0, null, 0, 2, "ion-label", [["range-left", ""]], null, null, null, null, null)), S.Y(91, 16384, [[16, 4]], 0, M.a, [Y.a, S.j, S.z, [8, null], [8, null], [8, null], [8, null]], null, null), (n()(),
            S._18(92, null, ["", ""])), (n()(),
            S._18(-1, null, ["\n                    "])), (n()(),
            S.Z(94, 0, null, 1, 2, "ion-label", [["range-right", ""]], null, null, null, null, null)), S.Y(95, 16384, [[16, 4]], 0, M.a, [Y.a, S.j, S.z, [8, null], [8, null], [8, null], [8, null]], null, null), (n()(),
            S._18(96, null, ["", ""])), (n()(),
            S._18(-1, null, ["\n                  "])), (n()(),
            S._18(-1, 2, ["\n                "])), (n()(),
            S._18(-1, 0, ["\n\n                "])), (n()(),
            S.Z(100, 0, null, 0, 34, "ion-item", [["align-items-center", ""], ["class", "item item-block"]], null, null, null, D.b, D.a)), S.Y(101, 1097728, null, 3, A.a, [Z.a, Y.a, S.j, S.z, [2, N.a]], null, null), S._16(335544320, 19, {
                contentLabel: 0
            }), S._16(603979776, 20, {
                _buttons: 1
            }), S._16(603979776, 21, {
                _icons: 1
            }), S.Y(105, 16384, null, 0, O.a, [], null, null), (n()(),
            S._18(-1, 2, ["\n                  "])), (n()(),
            S.Z(107, 0, null, 1, 2, "ion-label", [], null, null, null, null, null)), S.Y(108, 16384, [[19, 4]], 0, M.a, [Y.a, S.j, S.z, [8, null], [8, null], [8, null], [8, null]], null, null), (n()(),
            S._18(-1, null, ["Power"])), (n()(),
            S._18(-1, 2, ["\n                  "])), (n()(),
            S.Z(111, 0, null, 4, 5, "help-tip", [["item-end", ""], ["tip_text", "Disable the CoolBot's normal operation and turn off its display"], ["tip_title", "Power"]], null, null, null, i, H)), S.Y(112, 49152, null, 0, U.a, [], {
                tip_title: [0, "tip_title"],
                tip_text: [1, "tip_text"]
            }, null), (n()(),
            S._18(-1, 0, ["\n                    "])), (n()(),
            S.Z(114, 0, null, 0, 1, "p", [], null, null, null, null, null)), (n()(),
            S._18(-1, null, ["A/C will still cool to its set point (~60 F)."])), (n()(),
            S._18(-1, 0, ["\n                  "])), (n()(),
            S._18(-1, 2, ["\n                  "])), (n()(),
            S.Z(118, 0, null, 3, 15, "ion-select", [], [[2, "select-disabled", null], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngModelChange"], [null, "click"], [null, "keyup.space"]], function(n, l, t) {
                var e = !0;
                if ("click" === l) {
                    e = !1 !== S._13(n, 119)._click(t) && e
                }
                if ("keyup.space" === l) {
                    e = !1 !== S._13(n, 119)._keyup() && e
                }
                if ("ngModelChange" === l) {
                    e = !1 !== (n.parent.context.$implicit.powerOn = t) && e
                }
                return e
            }, K.b, K.a)), S.Y(119, 1228800, null, 1, J.a, [X.a, Z.a, Y.a, S.j, S.z, [2, A.a], Q.a], {
                disabled: [0, "disabled"]
            }, null), S._16(603979776, 22, {
                options: 1
            }), S._15(1024, null, $.l, function(n) {
                return [n]
            }, [J.a]), S.Y(122, 671744, null, 0, $.q, [[8, null], [8, null], [8, null], [2, $.l]], {
                isDisabled: [0, "isDisabled"],
                model: [1, "model"]
            }, {
                update: "ngModelChange"
            }), S._15(2048, null, $.m, null, [$.q]), S.Y(124, 16384, null, 0, $.n, [$.m], null, null), (n()(),
            S._18(-1, null, ["\n                    "])), (n()(),
            S.Z(126, 0, null, null, 2, "ion-option", [["value", "true"]], null, null, null, null, null)), S.Y(127, 16384, [[22, 4]], 0, nn.a, [S.j], {
                value: [0, "value"]
            }, null), (n()(),
            S._18(-1, null, ["On"])), (n()(),
            S._18(-1, null, ["\n                    "])), (n()(),
            S.Z(130, 0, null, null, 2, "ion-option", [["value", "false"]], null, null, null, null, null)), S.Y(131, 16384, [[22, 4]], 0, nn.a, [S.j], {
                value: [0, "value"]
            }, null), (n()(),
            S._18(-1, null, ["Off"])), (n()(),
            S._18(-1, null, ["\n                  "])), (n()(),
            S._18(-1, 2, ["\n                "])), (n()(),
            S._18(-1, 0, ["\n\n                "])), (n()(),
            S.Z(136, 0, null, 0, 101, "expanding-list-item", [["icon", "snow"], ["item_title", "Anti-freeze"]], null, null, null, I.b, I.a)), S.Y(137, 49152, null, 0, x.a, [], {
                item_title: [0, "item_title"],
                icon: [1, "icon"]
            }, null), (n()(),
            S._18(-1, 0, ["\n                  "])), (n()(),
            S.Z(139, 0, null, 0, 5, "div", [["align", "right"]], null, null, null, null, null)), (n()(),
            S._18(-1, null, ["\n                    "])), (n()(),
            S.Z(141, 0, null, null, 2, "button", [["ion-button", ""], ["style", "text-transform:none"]], [[8, "disabled", 0]], [[null, "click"]], function(n, l, t) {
                var e = !0;
                if ("click" === l) {
                    e = !1 !== n.component.toggleEdit(n.parent.context.$implicit) && e
                }
                return e
            }, T.b, T.a)), S.Y(142, 1097728, null, 0, E.a, [[8, ""], Y.a, S.j, S.z], {
                color: [0, "color"]
            }, null), (n()(),
            S._18(143, 0, ["\n                      ", "\n                    "])), (n()(),
            S._18(-1, null, ["\n                  "])), (n()(),
            S._18(-1, 0, ["\n\n                  "])), (n()(),
            S.Z(146, 0, null, 0, 20, "ion-item", [["class", "item item-block"], ["no-lines", ""]], null, null, null, D.b, D.a)), S.Y(147, 1097728, null, 3, A.a, [Z.a, Y.a, S.j, S.z, [2, N.a]], null, null), S._16(335544320, 23, {
                contentLabel: 0
            }), S._16(603979776, 24, {
                _buttons: 1
            }), S._16(603979776, 25, {
                _icons: 1
            }), S.Y(151, 16384, null, 0, O.a, [], null, null), (n()(),
            S._18(-1, 2, ["\n                    "])), (n()(),
            S.Z(153, 0, null, 1, 2, "ion-label", [["class", "label-tight"]], null, null, null, null, null)), S.Y(154, 16384, [[23, 4]], 0, M.a, [Y.a, S.j, S.z, [8, null], [8, null], [8, null], [8, null]], null, null), (n()(),
            S._18(-1, null, ["Fins setting:"])), (n()(),
            S._18(-1, 2, ["\n                    "])), (n()(),
            S.Z(157, 0, null, 4, 8, "help-tip", [["item-end", ""], ["tip_text", "Set the anti-freeze trigger temperature from 0 to 9 degrees above 32 F (0 C)"], ["tip_title", "Fins setting"]], null, null, null, i, H)), S.Y(158, 49152, null, 0, U.a, [], {
                tip_title: [0, "tip_title"],
                tip_text: [1, "tip_text"]
            }, null), (n()(),
            S._18(-1, 0, ["\n                      "])), (n()(),
            S.Z(160, 0, null, 0, 1, "p", [], null, null, null, null, null)), (n()(),
            S._18(-1, null, ["Default setting 1 starts defrost cycle when fins reach 33 F."])), (n()(),
            S._18(-1, 0, ["\n                      "])), (n()(),
            S.Z(163, 0, null, 0, 1, "p", [], null, null, null, null, null)), (n()(),
            S._18(-1, null, ["Raise if experiencing freeze-ups."])), (n()(),
            S._18(-1, 0, ["\n                    "])), (n()(),
            S._18(-1, 2, ["\n                  "])), (n()(),
            S._18(-1, 0, ["\n                  "])), (n()(),
            S.Z(168, 0, null, 0, 22, "ion-item", [["class", "item item-block"]], null, null, null, D.b, D.a)), S.Y(169, 1097728, null, 3, A.a, [Z.a, Y.a, S.j, S.z, [2, N.a]], null, null), S._16(335544320, 26, {
                contentLabel: 0
            }), S._16(603979776, 27, {
                _buttons: 1
            }), S._16(603979776, 28, {
                _icons: 1
            }), S.Y(173, 16384, null, 0, O.a, [], null, null), (n()(),
            S._18(-1, 2, ["\n                    "])), (n()(),
            S.Z(175, 0, null, 3, 14, "ion-range", [["class", "range-tight"], ["debounce", "500"], ["max", "9"], ["min", "0"], ["pin", "true"], ["step", "1"]], [[2, "range-disabled", null], [2, "range-pressed", null], [2, "range-has-pin", null], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngModelChange"]], function(n, l, t) {
                var e = !0;
                if ("ngModelChange" === l) {
                    e = !1 !== (n.parent.context.$implicit.finsSetTemp = t) && e
                }
                return e
            }, B.b, B.a)), S.Y(176, 1228800, null, 0, V.a, [Z.a, q.a, [2, A.a], Y.a, W.a, S.j, S.z, G.a, S.g], {
                disabled: [0, "disabled"],
                min: [1, "min"],
                max: [2, "max"],
                step: [3, "step"],
                pin: [4, "pin"],
                debounce: [5, "debounce"]
            }, null), S._15(1024, null, $.l, function(n) {
                return [n]
            }, [V.a]), S.Y(178, 671744, null, 0, $.q, [[8, null], [8, null], [8, null], [2, $.l]], {
                isDisabled: [0, "isDisabled"],
                model: [1, "model"]
            }, {
                update: "ngModelChange"
            }), S._15(2048, null, $.m, null, [$.q]), S.Y(180, 16384, null, 0, $.n, [$.m], null, null), (n()(),
            S._18(-1, null, ["\n                      "])), (n()(),
            S.Z(182, 0, null, 0, 2, "ion-label", [["range-left", ""]], null, null, null, null, null)), S.Y(183, 16384, [[26, 4]], 0, M.a, [Y.a, S.j, S.z, [8, null], [8, null], [8, null], [8, null]], null, null), (n()(),
            S._18(-1, null, ["0"])), (n()(),
            S._18(-1, null, ["\n                      "])), (n()(),
            S.Z(186, 0, null, 1, 2, "ion-label", [["range-right", ""]], null, null, null, null, null)), S.Y(187, 16384, [[26, 4]], 0, M.a, [Y.a, S.j, S.z, [8, null], [8, null], [8, null], [8, null]], null, null), (n()(),
            S._18(-1, null, ["9"])), (n()(),
            S._18(-1, null, ["\n                    "])), (n()(),
            S._18(-1, 2, ["\n                  "])), (n()(),
            S._18(-1, 0, ["\n\n                  "])), (n()(),
            S.Z(192, 0, null, 0, 20, "ion-item", [["class", "item item-block"], ["no-lines", ""]], null, null, null, D.b, D.a)), S.Y(193, 1097728, null, 3, A.a, [Z.a, Y.a, S.j, S.z, [2, N.a]], null, null), S._16(335544320, 29, {
                contentLabel: 0
            }), S._16(603979776, 30, {
                _buttons: 1
            }), S._16(603979776, 31, {
                _icons: 1
            }), S.Y(197, 16384, null, 0, O.a, [], null, null), (n()(),
            S._18(-1, 2, ["\n                    "])), (n()(),
            S.Z(199, 0, null, 1, 2, "ion-label", [["class", "label-tight"]], null, null, null, null, null)), S.Y(200, 16384, [[29, 4]], 0, M.a, [Y.a, S.j, S.z, [8, null], [8, null], [8, null], [8, null]], null, null), (n()(),
            S._18(-1, null, ["Heater delay:"])), (n()(),
            S._18(-1, 2, ["\n                    "])), (n()(),
            S.Z(203, 0, null, 4, 8, "help-tip", [["item-end", ""], ["tip_text", "Set the delay time from shortest (D0) to longest (D8) before telling A/C to cool again"], ["tip_title", "Heater delay"]], null, null, null, i, H)), S.Y(204, 49152, null, 0, U.a, [], {
                tip_title: [0, "tip_title"],
                tip_text: [1, "tip_text"]
            }, null), (n()(),
            S._18(-1, 0, ["\n                      "])), (n()(),
            S.Z(206, 0, null, 0, 1, "p", [], null, null, null, null, null)), (n()(),
            S._18(-1, null, ["The Default setting is D1."])), (n()(),
            S._18(-1, 0, ["\n                      "])), (n()(),
            S.Z(209, 0, null, 0, 1, "p", [], null, null, null, null, null)), (n()(),
            S._18(-1, null, ["Rarely needs adjustment, unless raising fins setting to 4 has not resolved freeze-ups."])), (n()(),
            S._18(-1, 0, ["\n                    "])), (n()(),
            S._18(-1, 2, ["\n                  "])), (n()(),
            S._18(-1, 0, ["\n                  "])), (n()(),
            S.Z(214, 0, null, 0, 22, "ion-item", [["class", "item item-block"]], null, null, null, D.b, D.a)), S.Y(215, 1097728, null, 3, A.a, [Z.a, Y.a, S.j, S.z, [2, N.a]], null, null), S._16(335544320, 32, {
                contentLabel: 0
            }), S._16(603979776, 33, {
                _buttons: 1
            }), S._16(603979776, 34, {
                _icons: 1
            }), S.Y(219, 16384, null, 0, O.a, [], null, null), (n()(),
            S._18(-1, 2, ["\n                    "])), (n()(),
            S.Z(221, 0, null, 3, 14, "ion-range", [["class", "range-tight"], ["debounce", "500"], ["max", "8"], ["min", "0"], ["pin", "true"], ["step", "1"]], [[2, "range-disabled", null], [2, "range-pressed", null], [2, "range-has-pin", null], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngModelChange"]], function(n, l, t) {
                var e = !0;
                if ("ngModelChange" === l) {
                    e = !1 !== (n.parent.context.$implicit.heaterDelay = t) && e
                }
                return e
            }, B.b, B.a)), S.Y(222, 1228800, null, 0, V.a, [Z.a, q.a, [2, A.a], Y.a, W.a, S.j, S.z, G.a, S.g], {
                disabled: [0, "disabled"],
                min: [1, "min"],
                max: [2, "max"],
                step: [3, "step"],
                pin: [4, "pin"],
                debounce: [5, "debounce"]
            }, null), S._15(1024, null, $.l, function(n) {
                return [n]
            }, [V.a]), S.Y(224, 671744, null, 0, $.q, [[8, null], [8, null], [8, null], [2, $.l]], {
                isDisabled: [0, "isDisabled"],
                model: [1, "model"]
            }, {
                update: "ngModelChange"
            }), S._15(2048, null, $.m, null, [$.q]), S.Y(226, 16384, null, 0, $.n, [$.m], null, null), (n()(),
            S._18(-1, null, ["\n                      "])), (n()(),
            S.Z(228, 0, null, 0, 2, "ion-label", [["range-left", ""]], null, null, null, null, null)), S.Y(229, 16384, [[32, 4]], 0, M.a, [Y.a, S.j, S.z, [8, null], [8, null], [8, null], [8, null]], null, null), (n()(),
            S._18(-1, null, ["D0"])), (n()(),
            S._18(-1, null, ["\n                      "])), (n()(),
            S.Z(232, 0, null, 1, 2, "ion-label", [["range-right", ""]], null, null, null, null, null)), S.Y(233, 16384, [[32, 4]], 0, M.a, [Y.a, S.j, S.z, [8, null], [8, null], [8, null], [8, null]], null, null), (n()(),
            S._18(-1, null, ["D8"])), (n()(),
            S._18(-1, null, ["\n                    "])), (n()(),
            S._18(-1, 2, ["\n                  "])), (n()(),
            S._18(-1, 0, ["\n\n                "])), (n()(),
            S._18(-1, 0, ["\n\n                "])), (n()(),
            S.Z(239, 0, null, 0, 2, "button", [["block", ""], ["color", "light"], ["ion-button", ""]], null, [[null, "click"]], function(n, l, t) {
                var e = !0;
                if ("click" === l) {
                    e = !1 !== n.component.factoryResetSettings(n.parent.context.$implicit) && e
                }
                return e
            }, T.b, T.a)), S.Y(240, 1097728, null, 0, E.a, [[8, ""], Y.a, S.j, S.z], {
                color: [0, "color"],
                block: [1, "block"]
            }, null), (n()(),
            S._18(-1, 0, ["\n                  Reset Settings to Defaults\n                "])), (n()(),
            S._18(-1, 0, ["\n\n                "])), (n()(),
            S.U(16777216, null, 0, 1, null, c)), S.Y(244, 16384, null, 0, j.i, [S.I, S.F], {
                ngIf: [0, "ngIf"]
            }, null), (n()(),
            S._18(-1, 0, ["\n\n                "])), (n()(),
            S.U(16777216, null, 0, 1, null, d)), S.Y(247, 16384, null, 0, j.i, [S.I, S.F], {
                ngIf: [0, "ngIf"]
            }, null), (n()(),
            S._18(-1, 0, ["\n\n              "])), (n()(),
            S._18(-1, null, ["\n\n            "]))], function(n, l) {
                var t = l.component;
                n(l, 3, 0, "Settings", t.showSettings, "settings");
                n(l, 8, 0, S._2(1, "", l.parent.context.$implicit.editMode ? "secondary" : "light", ""));
                n(l, 12, 0, l.parent.context.$implicit.editMode);
                n(l, 15, 0, l.parent.context.$implicit.editMode);
                n(l, 30, 0, "Set point", "The desired target temperature");
                n(l, 41, 0, !l.parent.context.$implicit.editMode, S._2(1, "", t.tSetMin.getDisp(), ""), S._2(1, "", t.tSetMax.getDisp(), ""), "1", "true", "800");
                n(l, 43, 0, !l.parent.context.$implicit.editMode, l.parent.context.$implicit.setTemp.getDisp());
                n(l, 69, 0, "Notifications temp range", "Send a notification when the room temperature goes outside this range");
                n(l, 84, 0, !l.parent.context.$implicit.editMode, S._2(1, "", t.tColdMin.getDisp(), ""), S._2(1, "", t.tHotMax.getDisp(), ""), "1", "true", "800", "true");
                n(l, 86, 0, !l.parent.context.$implicit.editMode, l.parent.context.$implicit.thresholds);
                n(l, 112, 0, "Power", "Disable the CoolBot's normal operation and turn off its display");
                n(l, 119, 0, !l.parent.context.$implicit.isConnected || !l.parent.context.$implicit.editMode);
                n(l, 122, 0, !l.parent.context.$implicit.isConnected || !l.parent.context.$implicit.editMode, l.parent.context.$implicit.powerOn);
                n(l, 127, 0, "true");
                n(l, 131, 0, "false");
                n(l, 137, 0, "Anti-freeze", "snow");
                n(l, 142, 0, S._2(1, "", l.parent.context.$implicit.editMode ? "secondary" : "light", ""));
                n(l, 158, 0, "Fins setting", "Set the anti-freeze trigger temperature from 0 to 9 degrees above 32 F (0 C)");
                n(l, 176, 0, !l.parent.context.$implicit.editMode, "0", "9", "1", "true", "500");
                n(l, 178, 0, !l.parent.context.$implicit.editMode, l.parent.context.$implicit.finsSetTemp);
                n(l, 204, 0, "Heater delay", "Set the delay time from shortest (D0) to longest (D8) before telling A/C to cool again");
                n(l, 222, 0, !l.parent.context.$implicit.editMode, "0", "8", "1", "true", "500");
                n(l, 224, 0, !l.parent.context.$implicit.editMode, l.parent.context.$implicit.heaterDelay);
                n(l, 240, 0, "light", "");
                n(l, 244, 0, t.coolbot_blynk().haveAnySavedSettings);
                n(l, 247, 0, !t.coolbot_blynk().haveAnySavedSettings)
            }, function(n, l) {
                var t = l.component;
                n(l, 7, 0, !t.editBtnEnabled(l.parent.context.$implicit));
                n(l, 9, 0, l.parent.context.$implicit.editMode ? "Save" : "Edit");
                n(l, 40, 0, S._13(l, 41)._disabled, S._13(l, 41)._pressed, S._13(l, 41)._pin, S._13(l, 45).ngClassUntouched, S._13(l, 45).ngClassTouched, S._13(l, 45).ngClassPristine, S._13(l, 45).ngClassDirty, S._13(l, 45).ngClassValid, S._13(l, 45).ngClassInvalid, S._13(l, 45).ngClassPending);
                n(l, 49, 0, t.tSetMin.strConcise());
                n(l, 53, 0, t.tSetMax.strConcise());
                n(l, 83, 0, S._13(l, 84)._disabled, S._13(l, 84)._pressed, S._13(l, 84)._pin, S._13(l, 88).ngClassUntouched, S._13(l, 88).ngClassTouched, S._13(l, 88).ngClassPristine, S._13(l, 88).ngClassDirty, S._13(l, 88).ngClassValid, S._13(l, 88).ngClassInvalid, S._13(l, 88).ngClassPending);
                n(l, 92, 0, t.tColdMin.strConcise());
                n(l, 96, 0, t.tHotMax.strConcise());
                n(l, 118, 0, S._13(l, 119)._disabled, S._13(l, 124).ngClassUntouched, S._13(l, 124).ngClassTouched, S._13(l, 124).ngClassPristine, S._13(l, 124).ngClassDirty, S._13(l, 124).ngClassValid, S._13(l, 124).ngClassInvalid, S._13(l, 124).ngClassPending);
                n(l, 141, 0, !t.editBtnEnabled(l.parent.context.$implicit));
                n(l, 143, 0, l.parent.context.$implicit.editMode ? "Save" : "Edit");
                n(l, 175, 0, S._13(l, 176)._disabled, S._13(l, 176)._pressed, S._13(l, 176)._pin, S._13(l, 180).ngClassUntouched, S._13(l, 180).ngClassTouched, S._13(l, 180).ngClassPristine, S._13(l, 180).ngClassDirty, S._13(l, 180).ngClassValid, S._13(l, 180).ngClassInvalid, S._13(l, 180).ngClassPending);
                n(l, 221, 0, S._13(l, 222)._disabled, S._13(l, 222)._pressed, S._13(l, 222)._pin, S._13(l, 226).ngClassUntouched, S._13(l, 226).ngClassTouched, S._13(l, 226).ngClassPristine, S._13(l, 226).ngClassDirty, S._13(l, 226).ngClassValid, S._13(l, 226).ngClassInvalid, S._13(l, 226).ngClassPending)
            })
        }
        function p(n) {
            return S._19(0, [(n()(),
            S.Z(0, 0, null, null, 5, "ion-label", [], null, null, null, null, null)), S.Y(1, 16384, [[35, 4]], 0, M.a, [Y.a, S.j, S.z, [8, null], [8, null], [8, null], [8, null]], null, null), (n()(),
            S._18(-1, null, ["Notify by\n                  "])), (n()(),
            S.Z(3, 0, null, null, 1, "a", [["href", "#"], ["title", "Edit email addresses"]], null, [[null, "click"]], function(n, l, t) {
                var e = !0;
                if ("click" === l) {
                    e = !1 !== n.component.viewProfile() && e
                }
                return e
            }, null, null)), (n()(),
            S._18(-1, null, ["email"])), (n()(),
            S._18(-1, null, ["\n                "]))], null, null)
        }
        function g(n) {
            return S._19(0, [(n()(),
            S.Z(0, 0, null, null, 5, "ion-label", [], null, null, null, null, null)), S.Y(1, 16384, [[35, 4]], 0, M.a, [Y.a, S.j, S.z, [8, null], [8, null], [8, null], [8, null]], null, null), (n()(),
            S._18(-1, null, ["Notify by\n                  "])), (n()(),
            S.Z(3, 0, null, null, 1, "a", [["href", "#"], ["title", "Add email addresses"]], null, [[null, "click"]], function(n, l, t) {
                var e = !0;
                if ("click" === l) {
                    e = !1 !== n.component.viewProfile() && e
                }
                return e
            }, null, null)), (n()(),
            S._18(-1, null, ["email"])), (n()(),
            S._18(-1, null, ["\n                "]))], null, null)
        }
        function f(n) {
            return S._19(0, [(n()(),
            S.Z(0, 0, null, null, 5, "ion-label", [], null, null, null, null, null)), S.Y(1, 16384, [[35, 4]], 0, M.a, [Y.a, S.j, S.z, [8, null], [8, null], [8, null], [8, null]], null, null), (n()(),
            S._18(-1, null, ["Notify by\n                  "])), (n()(),
            S.Z(3, 0, null, null, 1, "a", [["href", "#"], ["title", "Extra email address is invalid"]], null, [[null, "click"]], function(n, l, t) {
                var e = !0;
                if ("click" === l) {
                    e = !1 !== n.component.viewProfile() && e
                }
                return e
            }, null, null)), (n()(),
            S._18(-1, null, ["email"])), (n()(),
            S._18(-1, null, ["\n                "]))], null, null)
        }
        function _(n) {
            return S._19(0, [(n()(),
            S.Z(0, 0, null, null, 5, "ion-label", [], null, null, null, null, null)), S.Y(1, 16384, [[38, 4]], 0, M.a, [Y.a, S.j, S.z, [8, null], [8, null], [8, null], [8, null]], null, null), (n()(),
            S._18(-1, null, ["Notify by\n                  "])), (n()(),
            S.Z(3, 0, null, null, 1, "a", [["href", "#"], ["title", "Edit mobile number"]], null, [[null, "click"]], function(n, l, t) {
                var e = !0;
                if ("click" === l) {
                    e = !1 !== n.component.viewProfile() && e
                }
                return e
            }, null, null)), (n()(),
            S._18(-1, null, ["text message"])), (n()(),
            S._18(-1, null, ["\n                "]))], null, null)
        }
        function m(n) {
            return S._19(0, [(n()(),
            S.Z(0, 0, null, null, 5, "ion-label", [], null, null, null, null, null)), S.Y(1, 16384, [[38, 4]], 0, M.a, [Y.a, S.j, S.z, [8, null], [8, null], [8, null], [8, null]], null, null), (n()(),
            S._18(-1, null, ["Notify by\n                  "])), (n()(),
            S.Z(3, 0, null, null, 1, "a", [["href", "#"], ["title", "Set mobile number"]], null, [[null, "click"]], function(n, l, t) {
                var e = !0;
                if ("click" === l) {
                    e = !1 !== n.component.viewProfile() && e
                }
                return e
            }, null, null)), (n()(),
            S._18(-1, null, ["text message"])), (n()(),
            S._18(-1, null, ["\n                "]))], null, null)
        }
        function v(n) {
            return S._19(0, [(n()(),
            S.Z(0, 0, null, null, 5, "ion-label", [], null, null, null, null, null)), S.Y(1, 16384, [[38, 4]], 0, M.a, [Y.a, S.j, S.z, [8, null], [8, null], [8, null], [8, null]], null, null), (n()(),
            S._18(-1, null, ["Notify by\n                  "])), (n()(),
            S.Z(3, 0, null, null, 1, "a", [["href", "#"], ["title", "Mobile number is invalid"]], null, [[null, "click"]], function(n, l, t) {
                var e = !0;
                if ("click" === l) {
                    e = !1 !== n.component.viewProfile() && e
                }
                return e
            }, null, null)), (n()(),
            S._18(-1, null, ["text message"])), (n()(),
            S._18(-1, null, ["\n                "]))], null, null)
        }
        function b(n) {
            return S._19(0, [(n()(),
            S.Z(0, 0, null, null, 68, "expanding-list-item", [["icon", "notifications"], ["item_title", "Notifications"]], null, null, null, I.b, I.a)), S.Y(1, 49152, null, 0, x.a, [], {
                item_title: [0, "item_title"],
                icon: [1, "icon"]
            }, null), (n()(),
            S._18(-1, 0, ["\n              "])), (n()(),
            S.Z(3, 0, null, 0, 25, "ion-item", [["align-items-center", ""], ["class", "item item-block"]], null, null, null, D.b, D.a)), S.Y(4, 278528, null, 0, j.g, [S.p, S.q, S.j, S.A], {
                ngClass: [0, "ngClass"]
            }, null), S._14(5, {
                "modeless-invalid": 0
            }), S.Y(6, 1097728, null, 3, A.a, [Z.a, Y.a, S.j, S.z, [2, N.a]], null, null), S._16(603979776, 35, {
                contentLabel: 0
            }), S._16(603979776, 36, {
                _buttons: 1
            }), S._16(603979776, 37, {
                _icons: 1
            }), S.Y(10, 16384, null, 0, O.a, [], null, null), (n()(),
            S._18(-1, 2, ["\n                "])), (n()(),
            S.U(16777216, null, 1, 1, null, p)), S.Y(13, 16384, null, 0, j.i, [S.I, S.F], {
                ngIf: [0, "ngIf"]
            }, null), (n()(),
            S._18(-1, 2, ["\n                "])), (n()(),
            S.U(16777216, null, 1, 1, null, g)), S.Y(16, 16384, null, 0, j.i, [S.I, S.F], {
                ngIf: [0, "ngIf"]
            }, null), (n()(),
            S._18(-1, 2, ["\n                "])), (n()(),
            S.U(16777216, null, 1, 1, null, f)), S.Y(19, 16384, null, 0, j.i, [S.I, S.F], {
                ngIf: [0, "ngIf"]
            }, null), (n()(),
            S._18(-1, 2, ["\n                "])), (n()(),
            S.Z(21, 0, null, 4, 6, "ion-toggle", [["item-end", ""]], [[2, "toggle-disabled", null], [2, "toggle-checked", null], [2, "toggle-activated", null], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngModelChange"], [null, "keyup"]], function(n, l, t) {
                var e = !0;
                if ("keyup" === l) {
                    e = !1 !== S._13(n, 22)._keyup(t) && e
                }
                if ("ngModelChange" === l) {
                    e = !1 !== (n.parent.context.$implicit.notifyEmailOn = t) && e
                }
                if ("ngModelChange" === l) {
                    e = !1 !== n.parent.context.$implicit.postField("notifyEmailOn") && e
                }
                return e
            }, ln.b, ln.a)), S.Y(22, 1228800, null, 0, tn.a, [Z.a, Y.a, W.a, S.j, S.z, q.a, [2, A.a], en.l, G.a, S.u], null, null), S._15(1024, null, $.l, function(n) {
                return [n]
            }, [tn.a]), S.Y(24, 671744, null, 0, $.q, [[8, null], [8, null], [8, null], [2, $.l]], {
                model: [0, "model"]
            }, {
                update: "ngModelChange"
            }), S._15(2048, null, $.m, null, [$.q]), S.Y(26, 16384, null, 0, $.n, [$.m], null, null), (n()(),
            S._18(-1, null, ["\n                "])), (n()(),
            S._18(-1, 2, ["\n              "])), (n()(),
            S._18(-1, 0, ["\n\n              "])), (n()(),
            S.Z(30, 0, null, 0, 25, "ion-item", [["align-items-center", ""], ["class", "item item-block"]], null, null, null, D.b, D.a)), S.Y(31, 278528, null, 0, j.g, [S.p, S.q, S.j, S.A], {
                ngClass: [0, "ngClass"]
            }, null), S._14(32, {
                "modeless-invalid": 0
            }), S.Y(33, 1097728, null, 3, A.a, [Z.a, Y.a, S.j, S.z, [2, N.a]], null, null), S._16(603979776, 38, {
                contentLabel: 0
            }), S._16(603979776, 39, {
                _buttons: 1
            }), S._16(603979776, 40, {
                _icons: 1
            }), S.Y(37, 16384, null, 0, O.a, [], null, null), (n()(),
            S._18(-1, 2, ["\n                "])), (n()(),
            S.U(16777216, null, 1, 1, null, _)), S.Y(40, 16384, null, 0, j.i, [S.I, S.F], {
                ngIf: [0, "ngIf"]
            }, null), (n()(),
            S._18(-1, 2, ["\n                "])), (n()(),
            S.U(16777216, null, 1, 1, null, m)), S.Y(43, 16384, null, 0, j.i, [S.I, S.F], {
                ngIf: [0, "ngIf"]
            }, null), (n()(),
            S._18(-1, 2, ["\n                "])), (n()(),
            S.U(16777216, null, 1, 1, null, v)), S.Y(46, 16384, null, 0, j.i, [S.I, S.F], {
                ngIf: [0, "ngIf"]
            }, null), (n()(),
            S._18(-1, 2, ["\n                "])), (n()(),
            S.Z(48, 0, null, 4, 6, "ion-toggle", [["item-end", ""]], [[2, "toggle-disabled", null], [2, "toggle-checked", null], [2, "toggle-activated", null], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngModelChange"], [null, "keyup"]], function(n, l, t) {
                var e = !0;
                if ("keyup" === l) {
                    e = !1 !== S._13(n, 49)._keyup(t) && e
                }
                if ("ngModelChange" === l) {
                    e = !1 !== (n.parent.context.$implicit.notifySmsOn = t) && e
                }
                if ("ngModelChange" === l) {
                    e = !1 !== n.parent.context.$implicit.postField("notifySmsOn") && e
                }
                return e
            }, ln.b, ln.a)), S.Y(49, 1228800, null, 0, tn.a, [Z.a, Y.a, W.a, S.j, S.z, q.a, [2, A.a], en.l, G.a, S.u], null, null), S._15(1024, null, $.l, function(n) {
                return [n]
            }, [tn.a]), S.Y(51, 671744, null, 0, $.q, [[8, null], [8, null], [8, null], [2, $.l]], {
                model: [0, "model"]
            }, {
                update: "ngModelChange"
            }), S._15(2048, null, $.m, null, [$.q]), S.Y(53, 16384, null, 0, $.n, [$.m], null, null), (n()(),
            S._18(-1, null, ["\n                "])), (n()(),
            S._18(-1, 2, ["\n              "])), (n()(),
            S._18(-1, 0, ["\n\n              "])), (n()(),
            S.Z(57, 0, null, 0, 10, "ion-item", [["align-items-center", ""], ["class", "item item-block"]], null, null, null, D.b, D.a)), S.Y(58, 1097728, null, 3, A.a, [Z.a, Y.a, S.j, S.z, [2, N.a]], null, null), S._16(335544320, 41, {
                contentLabel: 0
            }), S._16(603979776, 42, {
                _buttons: 1
            }), S._16(603979776, 43, {
                _icons: 1
            }), S.Y(62, 16384, null, 0, O.a, [], null, null), (n()(),
            S._18(-1, 2, ["\n                "])), (n()(),
            S.Z(64, 0, null, 4, 2, "button", [["ion-button", ""], ["item-end", ""], ["title", "Send 'too hot' notifications"]], [[8, "disabled", 0]], [[null, "click"]], function(n, l, t) {
                var e = !0;
                if ("click" === l) {
                    e = !1 !== n.component.testNotification(n.parent.context.$implicit) && e
                }
                return e
            }, T.b, T.a)), S.Y(65, 1097728, [[42, 4]], 0, E.a, [[8, ""], Y.a, S.j, S.z], null, null), (n()(),
            S._18(-1, 0, ["Test"])), (n()(),
            S._18(-1, 2, ["\n              "])), (n()(),
            S._18(-1, 0, ["\n            "]))], function(n, l) {
                var t = l.component;
                n(l, 1, 0, "Notifications", "notifications");
                n(l, 4, 0, n(l, 5, 0, "invalid" == t.extraEmailState && l.parent.context.$implicit.notifyEmailOn));
                n(l, 13, 0, "OK" == t.extraEmailState);
                n(l, 16, 0, "empty" == t.extraEmailState);
                n(l, 19, 0, "invalid" == t.extraEmailState);
                n(l, 24, 0, l.parent.context.$implicit.notifyEmailOn);
                n(l, 31, 0, n(l, 32, 0, "OK" != t.smsNumberState && l.parent.context.$implicit.notifySmsOn));
                n(l, 40, 0, "OK" == t.smsNumberState);
                n(l, 43, 0, "empty" == t.smsNumberState);
                n(l, 46, 0, "invalid" == t.smsNumberState);
                n(l, 51, 0, l.parent.context.$implicit.notifySmsOn)
            }, function(n, l) {
                var t = l.component;
                n(l, 21, 0, S._13(l, 22)._disabled, S._13(l, 22)._value, S._13(l, 22)._activated, S._13(l, 26).ngClassUntouched, S._13(l, 26).ngClassTouched, S._13(l, 26).ngClassPristine, S._13(l, 26).ngClassDirty, S._13(l, 26).ngClassValid, S._13(l, 26).ngClassInvalid, S._13(l, 26).ngClassPending);
                n(l, 48, 0, S._13(l, 49)._disabled, S._13(l, 49)._value, S._13(l, 49)._activated, S._13(l, 53).ngClassUntouched, S._13(l, 53).ngClassTouched, S._13(l, 53).ngClassPristine, S._13(l, 53).ngClassDirty, S._13(l, 53).ngClassValid, S._13(l, 53).ngClassInvalid, S._13(l, 53).ngClassPending);
                n(l, 64, 0, t.blynk.isProfileDirty())
            })
        }
        function y(n) {
            return S._19(0, [(n()(),
            S.Z(0, 0, null, null, 9, "ion-item", [["class", "item item-block"]], null, null, null, D.b, D.a)), S.Y(1, 1097728, null, 3, A.a, [Z.a, Y.a, S.j, S.z, [2, N.a]], null, null), S._16(335544320, 65, {
                contentLabel: 0
            }), S._16(603979776, 66, {
                _buttons: 1
            }), S._16(603979776, 67, {
                _icons: 1
            }), S.Y(5, 16384, null, 0, O.a, [], null, null), (n()(),
            S._18(-1, 2, ["\n                MAC address\n                "])), (n()(),
            S.Z(7, 0, null, 4, 1, "span", [["item-end", ""]], null, null, null, null, null)), (n()(),
            S._18(8, null, ["", ""])), (n()(),
            S._18(-1, 2, ["\n              "]))], null, function(n, l) {
                n(l, 8, 0, l.parent.parent.context.$implicit.macAddress || "unknown")
            })
        }
        function C(n) {
            return S._19(0, [(n()(),
            S.Z(0, 0, null, null, 126, "expanding-list-item", [["icon", "information-circle"], ["item_title", "Details"]], null, null, null, I.b, I.a)), S.Y(1, 49152, null, 0, x.a, [], {
                item_title: [0, "item_title"],
                show: [1, "show"],
                icon: [2, "icon"]
            }, null), (n()(),
            S._18(-1, 0, ["\n              "])), (n()(),
            S.Z(3, 0, null, 0, 9, "ion-item", [["class", "item item-block"]], null, null, null, D.b, D.a)), S.Y(4, 1097728, null, 3, A.a, [Z.a, Y.a, S.j, S.z, [2, N.a]], null, null), S._16(335544320, 44, {
                contentLabel: 0
            }), S._16(603979776, 45, {
                _buttons: 1
            }), S._16(603979776, 46, {
                _icons: 1
            }), S.Y(8, 16384, null, 0, O.a, [], null, null), (n()(),
            S._18(-1, 2, ["\n                Room temp\n                "])), (n()(),
            S.Z(10, 0, null, 4, 1, "span", [["item-end", ""]], null, null, null, null, null)), (n()(),
            S._18(11, null, ["", ""])), (n()(),
            S._18(-1, 2, ["\n              "])), (n()(),
            S._18(-1, 0, ["\n              "])), (n()(),
            S.Z(14, 0, null, 0, 9, "ion-item", [["class", "item item-block"]], null, null, null, D.b, D.a)), S.Y(15, 1097728, null, 3, A.a, [Z.a, Y.a, S.j, S.z, [2, N.a]], null, null), S._16(335544320, 47, {
                contentLabel: 0
            }), S._16(603979776, 48, {
                _buttons: 1
            }), S._16(603979776, 49, {
                _icons: 1
            }), S.Y(19, 16384, null, 0, O.a, [], null, null), (n()(),
            S._18(-1, 2, ["\n                Fins temp\n                "])), (n()(),
            S.Z(21, 0, null, 4, 1, "span", [["item-end", ""]], null, null, null, null, null)), (n()(),
            S._18(22, null, ["", ""])), (n()(),
            S._18(-1, 2, ["\n              "])), (n()(),
            S._18(-1, 0, ["\n              "])), (n()(),
            S.Z(25, 0, null, 0, 9, "ion-item", [["class", "item item-block"]], null, null, null, D.b, D.a)), S.Y(26, 1097728, null, 3, A.a, [Z.a, Y.a, S.j, S.z, [2, N.a]], null, null), S._16(335544320, 50, {
                contentLabel: 0
            }), S._16(603979776, 51, {
                _buttons: 1
            }), S._16(603979776, 52, {
                _icons: 1
            }), S.Y(30, 16384, null, 0, O.a, [], null, null), (n()(),
            S._18(-1, 2, ["\n                Last activity\n                "])), (n()(),
            S.Z(32, 0, null, 4, 1, "concise-time", [["item-right", ""]], null, null, null, o, on)), S.Y(33, 573440, null, 0, un.a, [], {
                timestamp: [0, "timestamp"]
            }, null), (n()(),
            S._18(-1, 2, ["\n              "])), (n()(),
            S._18(-1, 0, ["\n              "])), (n()(),
            S.Z(36, 0, null, 0, 9, "ion-item", [["class", "item item-block"]], null, null, null, D.b, D.a)), S.Y(37, 1097728, null, 3, A.a, [Z.a, Y.a, S.j, S.z, [2, N.a]], null, null), S._16(335544320, 53, {
                contentLabel: 0
            }), S._16(603979776, 54, {
                _buttons: 1
            }), S._16(603979776, 55, {
                _icons: 1
            }), S.Y(41, 16384, null, 0, O.a, [], null, null), (n()(),
            S._18(-1, 2, ["\n                Last disconnect\n                "])), (n()(),
            S.Z(43, 0, null, 4, 1, "concise-time", [["empty", "never"], ["item-right", ""]], null, null, null, o, on)), S.Y(44, 573440, null, 0, un.a, [], {
                timestamp: [0, "timestamp"],
                empty: [1, "empty"]
            }, null), (n()(),
            S._18(-1, 2, ["\n              "])), (n()(),
            S._18(-1, 0, ["\n              "])), (n()(),
            S.Z(47, 0, null, 0, 9, "ion-item", [["class", "item item-block"]], null, null, null, D.b, D.a)), S.Y(48, 1097728, null, 3, A.a, [Z.a, Y.a, S.j, S.z, [2, N.a]], null, null), S._16(335544320, 56, {
                contentLabel: 0
            }), S._16(603979776, 57, {
                _buttons: 1
            }), S._16(603979776, 58, {
                _icons: 1
            }), S.Y(52, 16384, null, 0, O.a, [], null, null), (n()(),
            S._18(-1, 2, ["\n                CoolBot hardware version\n                "])), (n()(),
            S.Z(54, 0, null, 4, 1, "span", [["item-end", ""]], null, null, null, null, null)), (n()(),
            S._18(55, null, ["", ""])), (n()(),
            S._18(-1, 2, ["\n              "])), (n()(),
            S._18(-1, 0, ["\n              "])), (n()(),
            S.Z(58, 0, null, 0, 9, "ion-item", [["class", "item item-block"]], null, null, null, D.b, D.a)), S.Y(59, 1097728, null, 3, A.a, [Z.a, Y.a, S.j, S.z, [2, N.a]], null, null), S._16(335544320, 59, {
                contentLabel: 0
            }), S._16(603979776, 60, {
                _buttons: 1
            }), S._16(603979776, 61, {
                _icons: 1
            }), S.Y(63, 16384, null, 0, O.a, [], null, null), (n()(),
            S._18(-1, 2, ["\n                Jumper firmware version\n                "])), (n()(),
            S.Z(65, 0, null, 4, 1, "span", [["item-end", ""]], null, null, null, null, null)), (n()(),
            S._18(66, null, ["", ""])), (n()(),
            S._18(-1, 2, ["\n              "])), (n()(),
            S._18(-1, 0, ["\n              "])), (n()(),
            S.Z(69, 0, null, 0, 9, "ion-item", [["class", "item item-block"]], null, null, null, D.b, D.a)), S.Y(70, 1097728, null, 3, A.a, [Z.a, Y.a, S.j, S.z, [2, N.a]], null, null), S._16(335544320, 62, {
                contentLabel: 0
            }), S._16(603979776, 63, {
                _buttons: 1
            }), S._16(603979776, 64, {
                _icons: 1
            }), S.Y(74, 16384, null, 0, O.a, [], null, null), (n()(),
            S._18(-1, 2, ["\n                Jumper hardware version\n                "])), (n()(),
            S.Z(76, 0, null, 4, 1, "span", [["item-end", ""]], null, null, null, null, null)), (n()(),
            S._18(77, null, ["", ""])), (n()(),
            S._18(-1, 2, ["\n              "])), (n()(),
            S._18(-1, 0, ["\n              "])), (n()(),
            S.U(16777216, null, 0, 1, null, y)), S.Y(81, 16384, null, 0, j.i, [S.I, S.F], {
                ngIf: [0, "ngIf"]
            }, null), (n()(),
            S._18(-1, 0, ["\n              "])), (n()(),
            S.Z(83, 0, null, 0, 19, "ion-item", [["class", "item item-block"]], null, null, null, D.b, D.a)), S.Y(84, 1097728, null, 3, A.a, [Z.a, Y.a, S.j, S.z, [2, N.a]], null, null), S._16(335544320, 68, {
                contentLabel: 0
            }), S._16(603979776, 69, {
                _buttons: 1
            }), S._16(603979776, 70, {
                _icons: 1
            }), S.Y(88, 16384, null, 0, O.a, [], null, null), (n()(),
            S._18(-1, 2, ["\n                WiFi strength\n                "])), (n()(),
            S.Z(90, 0, null, 4, 8, "help-tip", [["item-end", ""], ["tip_text", "Below 15% you may experience disconnections - reposition your Jumper"], ["tip_title", "WiFi strength"]], null, null, null, i, H)), S.Y(91, 49152, null, 0, U.a, [], {
                tip_title: [0, "tip_title"],
                tip_text: [1, "tip_text"]
            }, null), (n()(),
            S._18(-1, 0, ["\n                  "])), (n()(),
            S.Z(93, 0, null, 0, 1, "p", [], null, null, null, null, null)), (n()(),
            S._18(-1, null, ["WiFi is not required for cooling.  The CoolBot will continue to control the A/C autonomously."])), (n()(),
            S._18(-1, 0, ["\n                  "])), (n()(),
            S.Z(96, 0, null, 0, 1, "p", [], null, null, null, null, null)), (n()(),
            S._18(-1, null, ["During WiFi disconnections only remote access and notifications will be affected."])), (n()(),
            S._18(-1, 0, ["\n                "])), (n()(),
            S._18(-1, 2, ["\n                "])), (n()(),
            S.Z(100, 0, null, 4, 1, "span", [["item-end", ""]], null, null, null, null, null)), (n()(),
            S._18(101, null, ["", ""])), (n()(),
            S._18(-1, 2, ["\n              "])), (n()(),
            S._18(-1, 0, ["\n              "])), (n()(),
            S.Z(104, 0, null, 0, 9, "ion-item", [["class", "item item-block"]], null, null, null, D.b, D.a)), S.Y(105, 1097728, null, 3, A.a, [Z.a, Y.a, S.j, S.z, [2, N.a]], null, null), S._16(335544320, 71, {
                contentLabel: 0
            }), S._16(603979776, 72, {
                _buttons: 1
            }), S._16(603979776, 73, {
                _icons: 1
            }), S.Y(109, 16384, null, 0, O.a, [], null, null), (n()(),
            S._18(-1, 2, ["\n                App version\n                "])), (n()(),
            S.Z(111, 0, null, 4, 1, "span", [["item-end", ""]], null, null, null, null, null)), (n()(),
            S._18(112, null, ["", ""])), (n()(),
            S._18(-1, 2, ["\n              "])), (n()(),
            S._18(-1, 0, ["\n              "])), (n()(),
            S.Z(115, 0, null, 0, 10, "ion-item", [["align-items-center", ""], ["class", "item item-block"]], null, null, null, D.b, D.a)), S.Y(116, 1097728, null, 3, A.a, [Z.a, Y.a, S.j, S.z, [2, N.a]], null, null), S._16(335544320, 74, {
                contentLabel: 0
            }), S._16(603979776, 75, {
                _buttons: 1
            }), S._16(603979776, 76, {
                _icons: 1
            }), S.Y(120, 16384, null, 0, O.a, [], null, null), (n()(),
            S._18(-1, 2, ["\n                "])), (n()(),
            S.Z(122, 0, null, 4, 2, "button", [["ion-button", ""], ["item-end", ""], ["title", "Ensure the app is at the latest version"]], null, [[null, "click"]], function(n, l, t) {
                var e = !0;
                if ("click" === l) {
                    e = !1 !== n.component.refreshApp() && e
                }
                return e
            }, T.b, T.a)), S.Y(123, 1097728, [[75, 4]], 0, E.a, [[8, ""], Y.a, S.j, S.z], null, null), (n()(),
            S._18(-1, 0, ["Reload"])), (n()(),
            S._18(-1, 2, ["\n              "])), (n()(),
            S._18(-1, 0, ["\n            "]))], function(n, l) {
                n(l, 1, 0, "Details", l.component.showDetails, "information-circle");
                n(l, 33, 0, l.parent.context.$implicit.lastActivityTime);
                n(l, 44, 0, l.parent.context.$implicit.disconnectTime, "never");
                n(l, 81, 0, l.parent.context.$implicit.macAddress);
                n(l, 91, 0, "WiFi strength", "Below 15% you may experience disconnections - reposition your Jumper")
            }, function(n, l) {
                var t = l.component;
                n(l, 11, 0, l.parent.context.$implicit.roomTemp.strConcise());
                n(l, 22, 0, l.parent.context.$implicit.finsTemp.strConcise());
                n(l, 55, 0, l.parent.context.$implicit.coolbotVersion || "unknown");
                n(l, 66, 0, l.parent.context.$implicit.firmwareVersion || "unknown");
                n(l, 77, 0, l.parent.context.$implicit.hardwareVersion || "unknown");
                n(l, 101, 0, l.parent.context.$implicit.wifiStrength || "unknown");
                n(l, 112, 0, t.appVersion || "unknown")
            })
        }
        function w(n) {
            return S._19(0, [(n()(),
            S.Z(0, 0, null, null, 2, "button", [["block", ""], ["color", "light"], ["ion-button", ""]], null, [[null, "click"]], function(n, l, t) {
                var e = !0;
                if ("click" === l) {
                    e = !1 !== n.component.deleteDevice(n.parent.context.$implicit) && e
                }
                return e
            }, T.b, T.a)), S.Y(1, 1097728, null, 0, E.a, [[8, ""], Y.a, S.j, S.z], {
                color: [0, "color"],
                block: [1, "block"]
            }, null), (n()(),
            S._18(-1, 0, ["Remove This CoolBot\n              "]))], function(n, l) {
                n(l, 1, 0, "light", "")
            }, null)
        }
        function k(n) {
            return S._19(0, [(n()(),
            S.Z(0, 0, null, null, 87, "div", [], null, null, null, null, null)), (n()(),
            S._18(-1, null, ["\n    "])), (n()(),
            S.Z(2, 0, null, null, 84, "ion-list", [], null, null, null, null, null)), S.Y(3, 16384, null, 0, an.a, [Y.a, S.j, S.z, W.a, en.l, G.a], null, null), (n()(),
            S._18(-1, null, ["\n      "])), (n()(),
            S.Z(5, 0, null, null, 80, "ion-grid", [["class", "grid"], ["style", "padding:0"]], null, null, null, null, null)), S.Y(6, 16384, null, 0, rn.a, [], null, null), (n()(),
            S._18(-1, null, ["\n        "])), (n()(),
            S.Z(8, 0, null, null, 76, "ion-row", [["class", "row"]], null, null, null, null, null)), S.Y(9, 16384, null, 0, sn.a, [], null, null), (n()(),
            S._18(-1, null, ["\n          "])), (n()(),
            S.Z(11, 0, null, null, 40, "ion-col", [["class", "col"], ["col-12", ""], ["style", "padding:0"]], null, null, null, null, null)), S.Y(12, 16384, null, 0, cn.a, [], null, null), (n()(),
            S._18(-1, null, [" \n\n            "])), (n()(),
            S.Z(14, 0, null, null, 21, "ion-item", [["class", "item item-block"]], null, null, null, D.b, D.a)), S.Y(15, 1097728, null, 3, A.a, [Z.a, Y.a, S.j, S.z, [2, N.a]], null, null), S._16(335544320, 1, {
                contentLabel: 0
            }), S._16(603979776, 2, {
                _buttons: 1
            }), S._16(603979776, 3, {
                _icons: 1
            }), S.Y(19, 16384, null, 0, O.a, [], null, null), (n()(),
            S._18(-1, 2, ["\n              "])), (n()(),
            S.Z(21, 0, null, 2, 9, "inline-editor", [["name", "editDeviceName"], ["placeholder", "device name"], ["size", "20"], ["type", "text"]], [[1, "pattern", 0], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngModelChange"], [null, "onSave"], [null, "onError"]], function(n, l, t) {
                var e = !0
                  , u = n.component;
                if ("ngModelChange" === l) {
                    e = !1 !== (n.context.$implicit.name = t) && e
                }
                if ("onSave" === l) {
                    e = !1 !== u.saveDevice(n.context.$implicit.id, t) && e
                }
                if ("onError" === l) {
                    e = !1 !== u.saveError(t) && e
                }
                return e
            }, dn.l, dn.k)), S._15(8704, null, S.i, S.S, [[8, [dn.h, dn.d, dn.e, dn.f, dn.i, dn.g, dn.b, dn.j, dn.c, dn.a]], [3, S.i], S.s]), S.Y(23, 1294336, null, 0, hn.a, [S.i], {
                type: [0, "type"],
                placeholder: [1, "placeholder"],
                name: [2, "name"],
                pattern: [3, "pattern"],
                size: [4, "size"]
            }, {
                onSave: "onSave",
                onError: "onError"
            }), S.Y(24, 540672, null, 0, $.s, [], {
                pattern: [0, "pattern"]
            }, null), S._15(1024, null, $.k, function(n, l) {
                return [n, l]
            }, [hn.a, $.s]), S._15(1024, null, $.l, function(n) {
                return [n]
            }, [hn.a]), S.Y(27, 671744, null, 0, $.q, [[8, null], [2, $.k], [8, null], [2, $.l]], {
                name: [0, "name"],
                model: [1, "model"]
            }, {
                update: "ngModelChange"
            }), S._15(2048, null, $.m, null, [$.q]), S.Y(29, 16384, null, 0, $.n, [$.m], null, null), (n()(),
            S._18(-1, null, ["\n              "])), (n()(),
            S._18(-1, 2, ["\n              "])), (n()(),
            S.Z(32, 0, null, 4, 2, "ion-badge", [["class", "only-above-md"], ["item-end", ""]], null, null, null, null, null)), S.Y(33, 16384, null, 0, pn.a, [Y.a, S.j, S.z], {
                color: [0, "color"]
            }, null), (n()(),
            S._18(34, null, ["", ""])), (n()(),
            S._18(-1, 2, ["\n            "])), (n()(),
            S._18(-1, null, ["\n            "])), (n()(),
            S.Z(37, 0, null, null, 10, "ion-item", [["class", "hide-above-md item item-block"], ["no-lines", ""]], null, null, null, D.b, D.a)), S.Y(38, 1097728, null, 3, A.a, [Z.a, Y.a, S.j, S.z, [2, N.a]], null, null), S._16(335544320, 4, {
                contentLabel: 0
            }), S._16(603979776, 5, {
                _buttons: 1
            }), S._16(603979776, 6, {
                _icons: 1
            }), S.Y(42, 16384, null, 0, O.a, [], null, null), (n()(),
            S._18(-1, 2, ["\n              Status\n              "])), (n()(),
            S.Z(44, 0, null, 4, 2, "ion-badge", [["item-end", ""]], null, null, null, null, null)), S.Y(45, 16384, null, 0, pn.a, [Y.a, S.j, S.z], {
                color: [0, "color"]
            }, null), (n()(),
            S._18(46, null, ["", ""])), (n()(),
            S._18(-1, 2, ["\n            "])), (n()(),
            S._18(-1, null, ["\n\n            "])), (n()(),
            S.U(16777216, null, null, 1, null, a)), S.Y(50, 16384, null, 0, j.i, [S.I, S.F], {
                ngIf: [0, "ngIf"]
            }, null), (n()(),
            S._18(-1, null, ["\n\n          "])), (n()(),
            S._18(-1, null, ["\n          "])), (n()(),
            S.Z(53, 0, null, null, 5, "ion-col", [["class", "col"], ["col-12", ""], ["col-lg-7", ""], ["col-md-6", ""], ["style", "padding:0 1% 0 1%"]], null, null, null, null, null)), S.Y(54, 16384, null, 0, cn.a, [], null, null), (n()(),
            S._18(-1, null, [" \n\n           "])), (n()(),
            S.U(16777216, null, null, 1, null, h)), S.Y(57, 16384, null, 0, j.i, [S.I, S.F], {
                ngIf: [0, "ngIf"]
            }, null), (n()(),
            S._18(-1, null, ["\n\n          "])), (n()(),
            S._18(-1, null, ["\n\n          "])), (n()(),
            S.Z(60, 0, null, null, 23, "ion-col", [["class", "col"], ["col-12", ""], ["col-lg-5", ""], ["col-md-6", ""], ["style", "padding:0 1% 0 1%"]], null, null, null, null, null)), S.Y(61, 16384, null, 0, cn.a, [], null, null), (n()(),
            S._18(-1, null, ["\n\n            "])), (n()(),
            S.U(16777216, null, null, 1, null, b)), S.Y(64, 16384, null, 0, j.i, [S.I, S.F], {
                ngIf: [0, "ngIf"]
            }, null), (n()(),
            S._18(-1, null, ["\n\n            "])), (n()(),
            S.U(16777216, null, null, 1, null, C)), S.Y(67, 16384, null, 0, j.i, [S.I, S.F], {
                ngIf: [0, "ngIf"]
            }, null), (n()(),
            S._18(-1, null, ["\n\n            "])), (n()(),
            S.Z(69, 0, null, null, 13, "expanding-list-item", [["icon", "build"], ["item_title", "Hardware Setup"]], null, null, null, I.b, I.a)), S.Y(70, 49152, null, 0, x.a, [], {
                item_title: [0, "item_title"],
                show: [1, "show"],
                icon: [2, "icon"]
            }, null), (n()(),
            S._18(-1, 0, ["\n              "])), (n()(),
            S.Z(72, 0, null, 0, 2, "button", [["block", ""], ["color", "light"], ["ion-button", ""]], [[8, "disabled", 0]], [[null, "click"]], function(n, l, t) {
                var e = !0;
                if ("click" === l) {
                    e = !1 !== n.component.updateFirmware(n.context.$implicit) && e
                }
                return e
            }, T.b, T.a)), S.Y(73, 1097728, null, 0, E.a, [[8, ""], Y.a, S.j, S.z], {
                color: [0, "color"],
                block: [1, "block"]
            }, null), (n()(),
            S._18(74, 0, ["\n                Update Firmware ", "\n              "])), (n()(),
            S._18(-1, 0, ["\n              "])), (n()(),
            S.Z(76, 0, null, 0, 2, "button", [["block", ""], ["color", "light"], ["ion-button", ""]], null, [[null, "click"]], function(n, l, t) {
                var e = !0;
                if ("click" === l) {
                    e = !1 !== n.component.reconfigure(n.context.$implicit.id) && e
                }
                return e
            }, T.b, T.a)), S.Y(77, 1097728, null, 0, E.a, [[8, ""], Y.a, S.j, S.z], {
                color: [0, "color"],
                block: [1, "block"]
            }, null), (n()(),
            S._18(-1, 0, ["Reconfigure WiFi\n              "])), (n()(),
            S._18(-1, 0, ["\n              "])), (n()(),
            S.U(16777216, null, 0, 1, null, w)), S.Y(81, 16384, null, 0, j.i, [S.I, S.F], {
                ngIf: [0, "ngIf"]
            }, null), (n()(),
            S._18(-1, 0, ["\n            "])), (n()(),
            S._18(-1, null, ["\n\n          "])), (n()(),
            S._18(-1, null, ["\n        "])), (n()(),
            S._18(-1, null, ["\n      "])), (n()(),
            S._18(-1, null, ["\n    "])), (n()(),
            S._18(-1, null, ["\n  "]))], function(n, l) {
                var t = l.component;
                n(l, 23, 0, "text", "device name", "editDeviceName", S._2(1, "^.", "{", "1,50}$"), "20");
                n(l, 24, 0, S._2(1, "^.", "{", "1,50}$"));
                n(l, 27, 0, "editDeviceName", l.context.$implicit.name);
                n(l, 33, 0, t.statusColor(l.context.$implicit));
                n(l, 45, 0, t.statusColor(l.context.$implicit));
                n(l, 50, 0, l.context.$implicit.firmwareUpgrade && l.context.$implicit.firmwareUpgrade());
                n(l, 57, 0, l.context.$implicit.isProvisioned);
                n(l, 64, 0, l.context.$implicit.isProvisioned);
                n(l, 67, 0, l.context.$implicit.isProvisioned);
                n(l, 70, 0, "Hardware Setup", !l.context.$implicit.isProvisioned, "build");
                n(l, 73, 0, "light", "");
                n(l, 77, 0, "light", "");
                n(l, 81, 0, t.blynk.devices.length > 1)
            }, function(n, l) {
                var t = l.component;
                n(l, 21, 0, S._13(l, 24).pattern ? S._13(l, 24).pattern : null, S._13(l, 29).ngClassUntouched, S._13(l, 29).ngClassTouched, S._13(l, 29).ngClassPristine, S._13(l, 29).ngClassDirty, S._13(l, 29).ngClassValid, S._13(l, 29).ngClassInvalid, S._13(l, 29).ngClassPending);
                n(l, 34, 0, t.statusText(l.context.$implicit));
                n(l, 46, 0, t.statusText(l.context.$implicit));
                n(l, 72, 0, !l.context.$implicit.isConnected);
                n(l, 74, 0, l.context.$implicit.firmwareUpgrade && l.context.$implicit.firmwareUpgrade() ? "to " + l.context.$implicit.firmwareUpgrade() : "")
            })
        }
        function P(n) {
            return S._19(0, [(n()(),
            S.Z(0, 0, null, null, 9, "ion-content", [["padding", ""]], [[2, "statusbar-padding", null], [2, "has-refresher", null]], null, null, gn.b, gn.a)), S.Y(1, 4374528, null, 0, fn.a, [Y.a, W.a, G.a, S.j, S.z, X.a, _n.a, S.u, [2, mn.a], [2, vn.a]], null, null), (n()(),
            S._18(-1, 1, ["\n  "])), (n()(),
            S.U(16777216, null, 1, 1, null, k)), S.Y(4, 802816, null, 0, j.h, [S.I, S.F, S.p], {
                ngForOf: [0, "ngForOf"]
            }, null), (n()(),
            S._18(-1, 1, ["\n\n  "])), (n()(),
            S.Z(6, 0, null, 1, 2, "button", [["block", ""], ["color", "light"], ["ion-button", ""]], null, [[null, "click"]], function(n, l, t) {
                var e = !0;
                if ("click" === l) {
                    e = !1 !== n.component.addNewDevice() && e
                }
                return e
            }, T.b, T.a)), S.Y(7, 1097728, null, 0, E.a, [[8, ""], Y.a, S.j, S.z], {
                color: [0, "color"],
                block: [1, "block"]
            }, null), (n()(),
            S._18(-1, 0, ["Add another CoolBot\n  "])), (n()(),
            S._18(-1, 1, ["\n"])), (n()(),
            S._18(-1, null, ["\n"]))], function(n, l) {
                n(l, 4, 0, l.component.blynk.devices);
                n(l, 7, 0, "light", "")
            }, function(n, l) {
                n(l, 0, 0, S._13(l, 1).statusbarPadding, S._13(l, 1)._hasRefresher)
            })
        }
        var S = t(0)
          , T = t(20)
          , E = t(14)
          , Y = t(2)
          , I = t(405)
          , x = t(145)
          , j = t(10)
          , D = t(38)
          , A = t(18)
          , Z = t(17)
          , N = t(28)
          , O = t(33)
          , M = t(41)
          , R = t(73)
          , z = t(80)
          , F = t(27)
          , L = t(74)
          , U = t(195)
          , H = S.X({
            encapsulation: 2,
            styles: [],
            data: {}
        })
          , B = t(520)
          , V = t(138)
          , q = t(40)
          , W = t(5)
          , G = t(7)
          , $ = t(16)
          , K = t(106)
          , J = t(61)
          , X = t(8)
          , Q = t(22)
          , nn = t(60)
          , ln = t(406)
          , tn = t(103)
          , en = t(9)
          , un = t(144)
          , on = S.X({
            encapsulation: 2,
            styles: [],
            data: {}
        })
          , an = t(30)
          , rn = t(58)
          , sn = t(43)
          , cn = t(42)
          , dn = t(521)
          , hn = t(115)
          , pn = t(96)
          , gn = t(72)
          , fn = t(23)
          , _n = t(26)
          , mn = t(6)
          , vn = t(21)
          , bn = t(112)
          , yn = t(19)
          , Cn = t(15)
          , wn = t(76)
          , kn = t(102)
          , Pn = t(63)
          , Sn = t(32)
          , Tn = t(36)
          , En = t(120);
        t.d(l, "a", function() {
            return In
        });
        var Yn = S.X({
            encapsulation: 2,
            styles: [],
            data: {}
        })
          , In = S.V("page-devices", bn.a, function(n) {
            return S._19(0, [(n()(),
            S.Z(0, 0, null, null, 1, "page-devices", [], null, null, null, P, Yn)), S.Y(1, 49152, null, 0, bn.a, [vn.a, yn.a, X.a, Cn.a, wn.a, kn.a, W.a, Pn.a, Sn.a, Tn.a, En.a], null, null)], null, null)
        }, {}, {}, [])
    },
    423: function(n, l, t) {
        "use strict";
        function e(n) {
            return i._19(0, [(n()(),
            i.Z(0, 0, null, null, 4, "p", [["text-center", ""]], null, null, null, null, null)), (n()(),
            i._18(-1, null, ["An email message was sent to "])), (n()(),
            i.Z(2, 0, null, null, 1, "b", [], null, null, null, null, null)), (n()(),
            i._18(3, null, ["", ""])), (n()(),
            i._18(-1, null, [" with password reset instructions."]))], null, function(n, l) {
                n(l, 3, 0, l.component.registerCredentials.email)
            })
        }
        function u(n) {
            return i._19(0, [i._16(402653184, 1, {
                passwordBox: 0
            }), i._16(402653184, 2, {
                passwordToggle: 0
            }), i._16(402653184, 3, {
                emailBox: 0
            }), (n()(),
            i.Z(3, 0, null, null, 82, "single-page", [["page_title", "Login"]], null, null, null, o.b, o.a)), i.Y(4, 49152, null, 0, a.a, [], {
                page_title: [0, "page_title"]
            }, null), (n()(),
            i._18(-1, 0, ["\n  "])), (n()(),
            i.Z(6, 0, null, 0, 75, "div", [["class", "login-box"]], null, null, null, null, null)), (n()(),
            i._18(-1, null, ["\n   "])), (n()(),
            i.Z(8, 0, null, null, 72, "form", [["novalidate", ""]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngSubmit"], [null, "submit"], [null, "reset"]], function(n, l, t) {
                var e = !0
                  , u = n.component;
                if ("submit" === l) {
                    e = !1 !== i._13(n, 10).onSubmit(t) && e
                }
                if ("reset" === l) {
                    e = !1 !== i._13(n, 10).onReset() && e
                }
                if ("ngSubmit" === l) {
                    e = !1 !== u.login() && e
                }
                return e
            }, null, null)), i.Y(9, 16384, null, 0, r.A, [], null, null), i.Y(10, 4210688, [["loginForm", 4]], 0, r.p, [[8, null], [8, null]], null, {
                ngSubmit: "ngSubmit"
            }), i._15(2048, null, r.d, null, [r.p]), i.Y(12, 16384, null, 0, r.o, [r.d], null, null), (n()(),
            i._18(-1, null, ["\n      "])), (n()(),
            i.Z(14, 0, null, null, 45, "ion-row", [["class", "row"]], null, null, null, null, null)), i.Y(15, 16384, null, 0, s.a, [], null, null), (n()(),
            i._18(-1, null, ["\n        "])), (n()(),
            i.Z(17, 0, null, null, 41, "ion-col", [["class", "col"]], null, null, null, null, null)), i.Y(18, 16384, null, 0, c.a, [], null, null), (n()(),
            i._18(-1, null, ["\n          "])), (n()(),
            i.Z(20, 0, null, null, 37, "ion-list", [["inset", ""]], null, null, null, null, null)), i.Y(21, 16384, null, 0, d.a, [h.a, i.j, i.z, p.a, g.l, f.a], null, null), (n()(),
            i._18(-1, null, ["\n           \n            "])), (n()(),
            i.Z(23, 0, null, null, 14, "ion-item", [["class", "item item-block"]], null, null, null, _.b, _.a)), i.Y(24, 1097728, null, 3, m.a, [v.a, h.a, i.j, i.z, [2, b.a]], null, null), i._16(335544320, 4, {
                contentLabel: 0
            }), i._16(603979776, 5, {
                _buttons: 1
            }), i._16(603979776, 6, {
                _icons: 1
            }), i.Y(28, 16384, null, 0, y.a, [], null, null), (n()(),
            i._18(-1, 2, ["\n              "])), (n()(),
            i.Z(30, 0, null, 3, 6, "ion-input", [["name", "email"], ["placeholder", "Email"], ["required", ""], ["type", "text"]], [[1, "required", 0], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngModelChange"]], function(n, l, t) {
                var e = !0;
                if ("ngModelChange" === l) {
                    e = !1 !== (n.component.registerCredentials.email = t) && e
                }
                return e
            }, C.b, C.a)), i.Y(31, 16384, null, 0, r.u, [], {
                required: [0, "required"]
            }, null), i._15(1024, null, r.k, function(n) {
                return [n]
            }, [r.u]), i.Y(33, 671744, null, 0, r.q, [[2, r.d], [2, r.k], [8, null], [8, null]], {
                name: [0, "name"],
                model: [1, "model"]
            }, {
                update: "ngModelChange"
            }), i._15(2048, null, r.m, null, [r.q]), i.Y(35, 16384, null, 0, r.n, [r.m], null, null), i.Y(36, 5423104, [[3, 4], ["email", 4]], 0, w.a, [h.a, p.a, v.a, k.a, i.j, i.z, [2, P.a], [2, m.a], [2, r.m], f.a], {
                type: [0, "type"],
                placeholder: [1, "placeholder"]
            }, null), (n()(),
            i._18(-1, 2, ["\n            "])), (n()(),
            i._18(-1, null, ["\n           \n            "])), (n()(),
            i.Z(39, 0, null, null, 17, "ion-item", [["class", "item item-block"]], null, null, null, _.b, _.a)), i.Y(40, 1097728, null, 3, m.a, [v.a, h.a, i.j, i.z, [2, b.a]], null, null), i._16(335544320, 7, {
                contentLabel: 0
            }), i._16(603979776, 8, {
                _buttons: 1
            }), i._16(603979776, 9, {
                _icons: 1
            }), i.Y(44, 16384, null, 0, y.a, [], null, null), (n()(),
            i._18(-1, 2, ["\n              "])), (n()(),
            i.Z(46, 0, null, 3, 6, "ion-input", [["id", "password"], ["name", "password"], ["placeholder", "Password"], ["required", ""]], [[1, "required", 0], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngModelChange"]], function(n, l, t) {
                var e = !0;
                if ("ngModelChange" === l) {
                    e = !1 !== (n.component.registerCredentials.password = t) && e
                }
                return e
            }, C.b, C.a)), i.Y(47, 16384, null, 0, r.u, [], {
                required: [0, "required"]
            }, null), i._15(1024, null, r.k, function(n) {
                return [n]
            }, [r.u]), i.Y(49, 671744, null, 0, r.q, [[2, r.d], [2, r.k], [8, null], [8, null]], {
                name: [0, "name"],
                model: [1, "model"]
            }, {
                update: "ngModelChange"
            }), i._15(2048, null, r.m, null, [r.q]), i.Y(51, 16384, null, 0, r.n, [r.m], null, null), i.Y(52, 5423104, [[1, 4], ["password", 4]], 0, w.a, [h.a, p.a, v.a, k.a, i.j, i.z, [2, P.a], [2, m.a], [2, r.m], f.a], {
                type: [0, "type"],
                placeholder: [1, "placeholder"]
            }, null), (n()(),
            i._18(-1, 2, ["\n              "])), (n()(),
            i.Z(54, 0, null, 4, 1, "password-toggle", [["item-end", ""]], null, null, null, S.b, S.a)), i.Y(55, 49152, [[2, 4], ["passwordToggle", 4]], 0, T.a, [], null, null), (n()(),
            i._18(-1, 2, ["\n            "])), (n()(),
            i._18(-1, null, ["\n           \n          "])), (n()(),
            i._18(-1, null, ["\n        "])), (n()(),
            i._18(-1, null, ["\n      "])), (n()(),
            i._18(-1, null, ["\n\n      "])), (n()(),
            i.Z(61, 0, null, null, 18, "ion-row", [["class", "row"]], null, null, null, null, null)), i.Y(62, 16384, null, 0, s.a, [], null, null), (n()(),
            i._18(-1, null, ["\n        "])), (n()(),
            i.Z(64, 0, null, null, 14, "ion-col", [["class", "signup-col col"]], null, null, null, null, null)), i.Y(65, 16384, null, 0, c.a, [], null, null), (n()(),
            i._18(-1, null, ["\n          "])), (n()(),
            i.Z(67, 0, null, null, 2, "button", [["full", ""], ["ion-button", ""], ["type", "submit"]], [[8, "disabled", 0]], [[null, "click"]], function(n, l, t) {
                var e = !0;
                if ("click" === l) {
                    e = !1 !== n.component.clickLogin() && e
                }
                return e
            }, E.b, E.a)), i.Y(68, 1097728, null, 0, Y.a, [[8, ""], h.a, i.j, i.z], {
                full: [0, "full"]
            }, null), (n()(),
            i._18(-1, 0, ["Login"])), (n()(),
            i._18(-1, null, ["\n          "])), (n()(),
            i.Z(71, 0, null, null, 2, "button", [["block", ""], ["clear", ""], ["ion-button", ""], ["type", "button"]], [[8, "disabled", 0]], [[null, "click"]], function(n, l, t) {
                var e = !0;
                if ("click" === l) {
                    e = !1 !== n.component.clickReset() && e
                }
                return e
            }, E.b, E.a)), i.Y(72, 1097728, null, 0, Y.a, [[8, ""], h.a, i.j, i.z], {
                clear: [0, "clear"],
                block: [1, "block"]
            }, null), (n()(),
            i._18(-1, 0, ["Reset Password"])), (n()(),
            i._18(-1, null, ["\n          "])), (n()(),
            i.Z(75, 0, null, null, 2, "button", [["block", ""], ["clear", ""], ["ion-button", ""], ["type", "button"]], null, [[null, "click"]], function(n, l, t) {
                var e = !0;
                if ("click" === l) {
                    e = !1 !== n.component.clickRegister() && e
                }
                return e
            }, E.b, E.a)), i.Y(76, 1097728, null, 0, Y.a, [[8, ""], h.a, i.j, i.z], {
                clear: [0, "clear"],
                block: [1, "block"]
            }, null), (n()(),
            i._18(-1, 0, ["Create New Account"])), (n()(),
            i._18(-1, null, ["\n        "])), (n()(),
            i._18(-1, null, ["\n      "])), (n()(),
            i._18(-1, null, ["\n    "])), (n()(),
            i._18(-1, null, ["\n  "])), (n()(),
            i._18(-1, 0, ["\n\n  "])), (n()(),
            i.U(16777216, null, 0, 1, null, e)), i.Y(84, 16384, null, 0, I.i, [i.I, i.F], {
                ngIf: [0, "ngIf"]
            }, null), (n()(),
            i._18(-1, 0, ["\n"]))], function(n, l) {
                var t = l.component;
                n(l, 4, 0, "Login");
                n(l, 31, 0, "");
                n(l, 33, 0, "email", t.registerCredentials.email);
                n(l, 36, 0, "text", "Email");
                n(l, 47, 0, "");
                n(l, 49, 0, "password", t.registerCredentials.password);
                n(l, 52, 0, i._13(l, 55).inputType, "Password");
                n(l, 68, 0, "");
                n(l, 72, 0, "", "");
                n(l, 76, 0, "", "");
                n(l, 84, 0, t.didResetPassword)
            }, function(n, l) {
                var t = l.component;
                n(l, 8, 0, i._13(l, 12).ngClassUntouched, i._13(l, 12).ngClassTouched, i._13(l, 12).ngClassPristine, i._13(l, 12).ngClassDirty, i._13(l, 12).ngClassValid, i._13(l, 12).ngClassInvalid, i._13(l, 12).ngClassPending);
                n(l, 30, 0, i._13(l, 31).required ? "" : null, i._13(l, 35).ngClassUntouched, i._13(l, 35).ngClassTouched, i._13(l, 35).ngClassPristine, i._13(l, 35).ngClassDirty, i._13(l, 35).ngClassValid, i._13(l, 35).ngClassInvalid, i._13(l, 35).ngClassPending);
                n(l, 46, 0, i._13(l, 47).required ? "" : null, i._13(l, 51).ngClassUntouched, i._13(l, 51).ngClassTouched, i._13(l, 51).ngClassPristine, i._13(l, 51).ngClassDirty, i._13(l, 51).ngClassValid, i._13(l, 51).ngClassInvalid, i._13(l, 51).ngClassPending);
                n(l, 67, 0, !i._13(l, 10).form.valid);
                n(l, 71, 0, !t.isEmailValid())
            })
        }
        t.d(l, "a", function() {
            return L
        });
        var i = t(0)
          , o = t(151)
          , a = t(87)
          , r = t(16)
          , s = t(43)
          , c = t(42)
          , d = t(30)
          , h = t(2)
          , p = t(5)
          , g = t(9)
          , f = t(7)
          , _ = t(38)
          , m = t(18)
          , v = t(17)
          , b = t(28)
          , y = t(33)
          , C = t(75)
          , w = t(49)
          , k = t(8)
          , P = t(23)
          , S = t(407)
          , T = t(146)
          , E = t(20)
          , Y = t(14)
          , I = t(10)
          , x = t(153)
          , j = t(21)
          , D = t(19)
          , A = t(63)
          , Z = t(34)
          , N = t(98)
          , O = t(15)
          , M = t(32)
          , R = t(52)
          , z = t(37)
          , F = i.X({
            encapsulation: 2,
            styles: [],
            data: {}
        })
          , L = i.V("page-login", x.a, function(n) {
            return i._19(0, [(n()(),
            i.Z(0, 0, null, null, 1, "page-login", [], null, null, null, u, F)), i.Y(1, 4243456, null, 0, x.a, [j.a, D.a, p.a, A.a, Z.a, N.a, O.a, M.a, R.a, z.a, k.a], null, null)], null, null)
        }, {}, {}, [])
    },
    424: function(n, l, t) {
        "use strict";
        function e(n) {
            return i._19(0, [(n()(),
            i.Z(0, 0, null, null, 14, "ion-item", [["class", "item item-block"]], null, null, null, o.b, o.a)), i.Y(1, 1097728, null, 3, a.a, [r.a, s.a, i.j, i.z, [2, c.a]], null, null), i._16(335544320, 26, {
                contentLabel: 0
            }), i._16(603979776, 27, {
                _buttons: 1
            }), i._16(603979776, 28, {
                _icons: 1
            }), i.Y(5, 16384, null, 0, d.a, [], null, null), (n()(),
            i._18(-1, 2, ["\n      "])), (n()(),
            i.Z(7, 0, null, 1, 2, "ion-label", [], null, null, null, null, null)), i.Y(8, 16384, [[26, 4]], 0, h.a, [s.a, i.j, i.z, [8, null], [8, null], [8, null], [8, null]], null, null), (n()(),
            i._18(9, null, ["", ""])), (n()(),
            i._18(-1, 2, ["\n      "])), (n()(),
            i.Z(11, 0, null, 4, 2, "button", [["ion-button", ""], ["item-end", ""], ["outline", ""]], null, [[null, "click"]], function(n, l, t) {
                var e = !0;
                if ("click" === l) {
                    e = !1 !== n.component.onSkip() && e
                }
                return e
            }, p.b, p.a)), i.Y(12, 1097728, [[27, 4]], 0, g.a, [[8, ""], s.a, i.j, i.z], {
                outline: [0, "outline"]
            }, null), (n()(),
            i._18(-1, 0, ["Skip"])), (n()(),
            i._18(-1, 2, ["\n    "]))], function(n, l) {
                n(l, 12, 0, "")
            }, function(n, l) {
                n(l, 9, 0, l.component.errorMessage)
            })
        }
        function u(n) {
            return i._19(0, [(n()(),
            i.Z(0, 0, null, null, 262, "single-page", [["page_title", "Welcome"]], null, null, null, f.b, f.a)), i.Y(1, 49152, null, 0, _.a, [], {
                page_title: [0, "page_title"]
            }, null), (n()(),
            i._18(-1, 0, ["\n  "])), (n()(),
            i.Z(3, 0, null, 0, 1, "p", [], null, null, null, null, null)), (n()(),
            i._18(-1, null, ["Please tell us a little about yourself."])), (n()(),
            i._18(-1, 0, ["\n\n  "])), (n()(),
            i.Z(6, 0, null, 0, 255, "form", [["novalidate", ""]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngSubmit"], [null, "submit"], [null, "reset"]], function(n, l, t) {
                var e = !0
                  , u = n.component;
                if ("submit" === l) {
                    e = !1 !== i._13(n, 8).onSubmit(t) && e
                }
                if ("reset" === l) {
                    e = !1 !== i._13(n, 8).onReset() && e
                }
                if ("ngSubmit" === l) {
                    e = !1 !== u.submitForm() && e
                }
                return e
            }, null, null)), i.Y(7, 16384, null, 0, m.A, [], null, null), i.Y(8, 540672, null, 0, m.h, [[8, null], [8, null]], {
                form: [0, "form"]
            }, {
                ngSubmit: "ngSubmit"
            }), i._15(2048, null, m.d, null, [m.h]), i.Y(10, 16384, null, 0, m.o, [m.d], null, null), (n()(),
            i._18(-1, null, ["\n    "])), (n()(),
            i.Z(12, 0, null, null, 16, "ion-item", [["class", "item item-block"]], null, null, null, o.b, o.a)), i.Y(13, 1097728, null, 3, a.a, [r.a, s.a, i.j, i.z, [2, c.a]], null, null), i._16(335544320, 1, {
                contentLabel: 0
            }), i._16(603979776, 2, {
                _buttons: 1
            }), i._16(603979776, 3, {
                _icons: 1
            }), i.Y(17, 16384, null, 0, d.a, [], null, null), (n()(),
            i._18(-1, 2, ["\n      "])), (n()(),
            i.Z(19, 0, null, 1, 2, "ion-label", [["floating", ""]], null, null, null, null, null)), i.Y(20, 16384, [[1, 4]], 0, h.a, [s.a, i.j, i.z, [8, ""], [8, null], [8, null], [8, null]], null, null), (n()(),
            i._18(-1, null, ["First name"])), (n()(),
            i._18(-1, 2, ["\n      "])), (n()(),
            i.Z(23, 0, null, 3, 4, "ion-input", [["formControlName", "firstname"]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], null, null, v.b, v.a)), i.Y(24, 671744, null, 0, m.g, [[3, m.d], [8, null], [8, null], [8, null]], {
                name: [0, "name"]
            }, null), i._15(2048, null, m.m, null, [m.g]), i.Y(26, 16384, null, 0, m.n, [m.m], null, null), i.Y(27, 5423104, null, 0, b.a, [s.a, y.a, r.a, C.a, i.j, i.z, [2, w.a], [2, a.a], [2, m.m], k.a], null, null), (n()(),
            i._18(-1, 2, ["\n    "])), (n()(),
            i._18(-1, null, ["\n\n    "])), (n()(),
            i.Z(30, 0, null, null, 16, "ion-item", [["class", "item item-block"]], null, null, null, o.b, o.a)), i.Y(31, 1097728, null, 3, a.a, [r.a, s.a, i.j, i.z, [2, c.a]], null, null), i._16(335544320, 4, {
                contentLabel: 0
            }), i._16(603979776, 5, {
                _buttons: 1
            }), i._16(603979776, 6, {
                _icons: 1
            }), i.Y(35, 16384, null, 0, d.a, [], null, null), (n()(),
            i._18(-1, 2, ["\n      "])), (n()(),
            i.Z(37, 0, null, 1, 2, "ion-label", [["floating", ""]], null, null, null, null, null)), i.Y(38, 16384, [[4, 4]], 0, h.a, [s.a, i.j, i.z, [8, ""], [8, null], [8, null], [8, null]], null, null), (n()(),
            i._18(-1, null, ["Last name"])), (n()(),
            i._18(-1, 2, ["\n      "])), (n()(),
            i.Z(41, 0, null, 3, 4, "ion-input", [["formControlName", "lastname"]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], null, null, v.b, v.a)), i.Y(42, 671744, null, 0, m.g, [[3, m.d], [8, null], [8, null], [8, null]], {
                name: [0, "name"]
            }, null), i._15(2048, null, m.m, null, [m.g]), i.Y(44, 16384, null, 0, m.n, [m.m], null, null), i.Y(45, 5423104, null, 0, b.a, [s.a, y.a, r.a, C.a, i.j, i.z, [2, w.a], [2, a.a], [2, m.m], k.a], null, null), (n()(),
            i._18(-1, 2, ["\n    "])), (n()(),
            i._18(-1, null, ["\n\n    "])), (n()(),
            i.Z(48, 0, null, null, 1, "p", [], null, null, null, null, null)), (n()(),
            i._18(-1, null, ["Your mobile number is only used for notifications you request."])), (n()(),
            i._18(-1, null, ["\n    "])), (n()(),
            i.Z(51, 0, null, null, 22, "ion-item", [["class", "item item-block"]], null, null, null, o.b, o.a)), i.Y(52, 1097728, null, 3, a.a, [r.a, s.a, i.j, i.z, [2, c.a]], null, null), i._16(335544320, 7, {
                contentLabel: 0
            }), i._16(603979776, 8, {
                _buttons: 1
            }), i._16(603979776, 9, {
                _icons: 1
            }), i.Y(56, 16384, null, 0, d.a, [], null, null), (n()(),
            i._18(-1, 2, ["\n      "])), (n()(),
            i.Z(58, 0, null, 1, 2, "ion-label", [], null, null, null, null, null)), i.Y(59, 16384, [[7, 4]], 0, h.a, [s.a, i.j, i.z, [8, null], [8, null], [8, null], [8, null]], null, null), (n()(),
            i._18(-1, null, ["Mobile number"])), (n()(),
            i._18(-1, 2, ["\n      "])), (n()(),
            i.Z(62, 0, null, 3, 10, "ion-input", [["autocomplete", "on"], ["formControlName", "mobilephone"], ["item-end", ""], ["minlength", "12"], ["placeholder", "xxx-xxx-xxxx"], ["text-right", ""], ["type", "tel"]], [[1, "minlength", 0], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "keyup"], [null, "ionBlur"], [null, "ionFocus"]], function(n, l, t) {
                var e = !0;
                if ("keyup" === l) {
                    e = !1 !== i._13(n, 65).inputKeyup(t) && e
                }
                if ("ionBlur" === l) {
                    e = !1 !== i._13(n, 65).inputOnblur(t) && e
                }
                if ("ionFocus" === l) {
                    e = !1 !== i._13(n, 65).inputFocus(t) && e
                }
                return e
            }, v.b, v.a)), i.Y(63, 540672, null, 0, m.j, [], {
                minlength: [0, "minlength"]
            }, null), i._15(1024, null, m.k, function(n) {
                return [n]
            }, [m.j]), i.Y(65, 81920, null, 0, P.a, [i.z, i.j], {
                brmasker: [0, "brmasker"]
            }, null), i._14(66, {
                mask: 0,
                len: 1
            }), i._15(1024, null, m.l, function(n) {
                return [n]
            }, [P.a]), i.Y(68, 671744, null, 0, m.g, [[3, m.d], [2, m.k], [8, null], [2, m.l]], {
                name: [0, "name"]
            }, null), i._15(2048, null, m.m, null, [m.g]), i.Y(70, 16384, null, 0, m.n, [m.m], null, null), i.Y(71, 5423104, null, 0, b.a, [s.a, y.a, r.a, C.a, i.j, i.z, [2, w.a], [2, a.a], [2, m.m], k.a], {
                type: [0, "type"],
                autocomplete: [1, "autocomplete"],
                placeholder: [2, "placeholder"]
            }, {
                ionFocus: "ionFocus",
                ionBlur: "ionBlur"
            }), (n()(),
            i._18(-1, null, ["\n      "])), (n()(),
            i._18(-1, 2, ["\n    "])), (n()(),
            i._18(-1, null, ["\n\n    "])), (n()(),
            i.Z(75, 0, null, null, 1, "p", [], null, null, null, null, null)), (n()(),
            i._18(-1, null, ["What's the primary use for your CoolBot Pro powered cooler?"])), (n()(),
            i._18(-1, null, ["\n    "])), (n()(),
            i.Z(78, 0, null, null, 54, "ion-item", [["class", "item item-block"]], null, null, null, o.b, o.a)), i.Y(79, 1097728, null, 3, a.a, [r.a, s.a, i.j, i.z, [2, c.a]], null, null), i._16(335544320, 10, {
                contentLabel: 0
            }), i._16(603979776, 11, {
                _buttons: 1
            }), i._16(603979776, 12, {
                _icons: 1
            }), i.Y(83, 16384, null, 0, d.a, [], null, null), (n()(),
            i._18(-1, 2, ["\n      "])), (n()(),
            i.Z(85, 0, null, 1, 1, "ion-label", [], null, null, null, null, null)), i.Y(86, 16384, [[10, 4]], 0, h.a, [s.a, i.j, i.z, [8, null], [8, null], [8, null], [8, null]], null, null), (n()(),
            i._18(-1, 2, ["\n      "])), (n()(),
            i.Z(88, 0, null, 3, 43, "ion-select", [["formControlName", "primary_use"], ["interface", "action-sheet"], ["placeholder", "Please select..."]], [[2, "select-disabled", null], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "click"], [null, "keyup.space"]], function(n, l, t) {
                var e = !0;
                if ("click" === l) {
                    e = !1 !== i._13(n, 89)._click(t) && e
                }
                if ("keyup.space" === l) {
                    e = !1 !== i._13(n, 89)._keyup() && e
                }
                return e
            }, S.b, S.a)), i.Y(89, 1228800, null, 1, T.a, [C.a, r.a, s.a, i.j, i.z, [2, a.a], E.a], {
                placeholder: [0, "placeholder"],
                interface: [1, "interface"]
            }, null), i._16(603979776, 13, {
                options: 1
            }), i._15(1024, null, m.l, function(n) {
                return [n]
            }, [T.a]), i.Y(92, 671744, null, 0, m.g, [[3, m.d], [8, null], [8, null], [2, m.l]], {
                name: [0, "name"]
            }, null), i._15(2048, null, m.m, null, [m.g]), i.Y(94, 16384, null, 0, m.n, [m.m], null, null), (n()(),
            i._18(-1, null, ["\n        "])), (n()(),
            i.Z(96, 0, null, null, 2, "ion-option", [], null, null, null, null, null)), i.Y(97, 16384, [[13, 4]], 0, Y.a, [i.j], null, null), (n()(),
            i._18(-1, null, ["Agriculture"])), (n()(),
            i._18(-1, null, ["\n        "])), (n()(),
            i.Z(100, 0, null, null, 2, "ion-option", [], null, null, null, null, null)), i.Y(101, 16384, [[13, 4]], 0, Y.a, [i.j], null, null), (n()(),
            i._18(-1, null, ["Bar"])), (n()(),
            i._18(-1, null, ["\n        "])), (n()(),
            i.Z(104, 0, null, null, 2, "ion-option", [], null, null, null, null, null)), i.Y(105, 16384, [[13, 4]], 0, Y.a, [i.j], null, null), (n()(),
            i._18(-1, null, ["Brewing or Home Brewing"])), (n()(),
            i._18(-1, null, ["\n        "])), (n()(),
            i.Z(108, 0, null, null, 2, "ion-option", [], null, null, null, null, null)), i.Y(109, 16384, [[13, 4]], 0, Y.a, [i.j], null, null), (n()(),
            i._18(-1, null, ["Cheese and Dairy"])), (n()(),
            i._18(-1, null, ["\n        "])), (n()(),
            i.Z(112, 0, null, null, 2, "ion-option", [], null, null, null, null, null)), i.Y(113, 16384, [[13, 4]], 0, Y.a, [i.j], null, null), (n()(),
            i._18(-1, null, ["Floral"])), (n()(),
            i._18(-1, null, ["\n        "])), (n()(),
            i.Z(116, 0, null, null, 2, "ion-option", [], null, null, null, null, null)), i.Y(117, 16384, [[13, 4]], 0, Y.a, [i.j], null, null), (n()(),
            i._18(-1, null, ["Hunting or Butchering"])), (n()(),
            i._18(-1, null, ["\n        "])), (n()(),
            i.Z(120, 0, null, null, 2, "ion-option", [], null, null, null, null, null)), i.Y(121, 16384, [[13, 4]], 0, Y.a, [i.j], null, null), (n()(),
            i._18(-1, null, ["Restaurant"])), (n()(),
            i._18(-1, null, ["\n        "])), (n()(),
            i.Z(124, 0, null, null, 2, "ion-option", [], null, null, null, null, null)), i.Y(125, 16384, [[13, 4]], 0, Y.a, [i.j], null, null), (n()(),
            i._18(-1, null, ["Wine Cellar"])), (n()(),
            i._18(-1, null, ["\n        "])), (n()(),
            i.Z(128, 0, null, null, 2, "ion-option", [], null, null, null, null, null)), i.Y(129, 16384, [[13, 4]], 0, Y.a, [i.j], null, null), (n()(),
            i._18(-1, null, ["Other"])), (n()(),
            i._18(-1, null, ["\n      "])), (n()(),
            i._18(-1, 2, ["\n    "])), (n()(),
            i._18(-1, null, ["\n\n    "])), (n()(),
            i.Z(134, 0, null, null, 1, "p", [], null, null, null, null, null)), (n()(),
            i._18(-1, null, ["How did you first hear about the CoolBot?"])), (n()(),
            i._18(-1, null, ["\n    "])), (n()(),
            i.Z(137, 0, null, null, 38, "ion-item", [["class", "item item-block"]], null, null, null, o.b, o.a)), i.Y(138, 1097728, null, 3, a.a, [r.a, s.a, i.j, i.z, [2, c.a]], null, null), i._16(335544320, 14, {
                contentLabel: 0
            }), i._16(603979776, 15, {
                _buttons: 1
            }), i._16(603979776, 16, {
                _icons: 1
            }), i.Y(142, 16384, null, 0, d.a, [], null, null), (n()(),
            i._18(-1, 2, ["\n      "])), (n()(),
            i.Z(144, 0, null, 1, 1, "ion-label", [], null, null, null, null, null)), i.Y(145, 16384, [[14, 4]], 0, h.a, [s.a, i.j, i.z, [8, null], [8, null], [8, null], [8, null]], null, null), (n()(),
            i._18(-1, 2, ["\n      "])), (n()(),
            i.Z(147, 0, null, 3, 27, "ion-select", [["formControlName", "how_did_you_hear_about_us"], ["interface", "action-sheet"], ["placeholder", "Please select..."]], [[2, "select-disabled", null], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "click"], [null, "keyup.space"]], function(n, l, t) {
                var e = !0;
                if ("click" === l) {
                    e = !1 !== i._13(n, 148)._click(t) && e
                }
                if ("keyup.space" === l) {
                    e = !1 !== i._13(n, 148)._keyup() && e
                }
                return e
            }, S.b, S.a)), i.Y(148, 1228800, null, 1, T.a, [C.a, r.a, s.a, i.j, i.z, [2, a.a], E.a], {
                placeholder: [0, "placeholder"],
                interface: [1, "interface"]
            }, null), i._16(603979776, 17, {
                options: 1
            }), i._15(1024, null, m.l, function(n) {
                return [n]
            }, [T.a]), i.Y(151, 671744, null, 0, m.g, [[3, m.d], [8, null], [8, null], [2, m.l]], {
                name: [0, "name"]
            }, null), i._15(2048, null, m.m, null, [m.g]), i.Y(153, 16384, null, 0, m.n, [m.m], null, null), (n()(),
            i._18(-1, null, ["\n        "])), (n()(),
            i.Z(155, 0, null, null, 2, "ion-option", [], null, null, null, null, null)), i.Y(156, 16384, [[17, 4]], 0, Y.a, [i.j], null, null), (n()(),
            i._18(-1, null, ["Google or Internet search"])), (n()(),
            i._18(-1, null, ["\n        "])), (n()(),
            i.Z(159, 0, null, null, 2, "ion-option", [["value", "Social media"]], null, null, null, null, null)), i.Y(160, 16384, [[17, 4]], 0, Y.a, [i.j], {
                value: [0, "value"]
            }, null), (n()(),
            i._18(-1, null, ["Social media (blog, Facebook, Instagram, etc.)"])), (n()(),
            i._18(-1, null, ["\n        "])), (n()(),
            i.Z(163, 0, null, null, 2, "ion-option", [], null, null, null, null, null)), i.Y(164, 16384, [[17, 4]], 0, Y.a, [i.j], null, null), (n()(),
            i._18(-1, null, ["Referral or friend"])), (n()(),
            i._18(-1, null, ["\n        "])), (n()(),
            i.Z(167, 0, null, null, 2, "ion-option", [], null, null, null, null, null)), i.Y(168, 16384, [[17, 4]], 0, Y.a, [i.j], null, null), (n()(),
            i._18(-1, null, ["Home Depot or Cabela's"])), (n()(),
            i._18(-1, null, ["\n        "])), (n()(),
            i.Z(171, 0, null, null, 2, "ion-option", [], null, null, null, null, null)), i.Y(172, 16384, [[17, 4]], 0, Y.a, [i.j], null, null), (n()(),
            i._18(-1, null, ["Other"])), (n()(),
            i._18(-1, null, ["\n      "])), (n()(),
            i._18(-1, 2, ["\n    "])), (n()(),
            i._18(-1, null, ["\n\n    "])), (n()(),
            i.Z(177, 0, null, null, 1, "p", [], null, null, null, null, null)), (n()(),
            i._18(-1, null, ["What is your top reason for using the CoolBot Pro?"])), (n()(),
            i._18(-1, null, ["\n    "])), (n()(),
            i.Z(180, 0, null, null, 42, "ion-item", [["class", "item item-block"]], null, null, null, o.b, o.a)), i.Y(181, 1097728, null, 3, a.a, [r.a, s.a, i.j, i.z, [2, c.a]], null, null), i._16(335544320, 18, {
                contentLabel: 0
            }), i._16(603979776, 19, {
                _buttons: 1
            }), i._16(603979776, 20, {
                _icons: 1
            }), i.Y(185, 16384, null, 0, d.a, [], null, null), (n()(),
            i._18(-1, 2, ["\n      "])), (n()(),
            i.Z(187, 0, null, 1, 1, "ion-label", [], null, null, null, null, null)), i.Y(188, 16384, [[18, 4]], 0, h.a, [s.a, i.j, i.z, [8, null], [8, null], [8, null], [8, null]], null, null), (n()(),
            i._18(-1, 2, ["\n      "])), (n()(),
            i.Z(190, 0, null, 3, 31, "ion-select", [["formControlName", "cb_pro_purchase_reason"], ["interface", "action-sheet"], ["placeholder", "Please select..."]], [[2, "select-disabled", null], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "click"], [null, "keyup.space"]], function(n, l, t) {
                var e = !0;
                if ("click" === l) {
                    e = !1 !== i._13(n, 191)._click(t) && e
                }
                if ("keyup.space" === l) {
                    e = !1 !== i._13(n, 191)._keyup() && e
                }
                return e
            }, S.b, S.a)), i.Y(191, 1228800, null, 1, T.a, [C.a, r.a, s.a, i.j, i.z, [2, a.a], E.a], {
                placeholder: [0, "placeholder"],
                interface: [1, "interface"]
            }, null), i._16(603979776, 21, {
                options: 1
            }), i._15(1024, null, m.l, function(n) {
                return [n]
            }, [T.a]), i.Y(194, 671744, null, 0, m.g, [[3, m.d], [8, null], [8, null], [2, m.l]], {
                name: [0, "name"]
            }, null), i._15(2048, null, m.m, null, [m.g]), i.Y(196, 16384, null, 0, m.n, [m.m], null, null), (n()(),
            i._18(-1, null, ["\n        "])), (n()(),
            i.Z(198, 0, null, null, 2, "ion-option", [], null, null, null, null, null)), i.Y(199, 16384, [[21, 4]], 0, Y.a, [i.j], null, null), (n()(),
            i._18(-1, null, ["Wi-Fi functionality / phone app"])), (n()(),
            i._18(-1, null, ["\n        "])), (n()(),
            i.Z(202, 0, null, null, 2, "ion-option", [], null, null, null, null, null)), i.Y(203, 16384, [[21, 4]], 0, Y.a, [i.j], null, null), (n()(),
            i._18(-1, null, ["Price / value"])), (n()(),
            i._18(-1, null, ["\n        "])), (n()(),
            i.Z(206, 0, null, null, 2, "ion-option", [], null, null, null, null, null)), i.Y(207, 16384, [[21, 4]], 0, Y.a, [i.j], null, null), (n()(),
            i._18(-1, null, ["Remote functions / temperature adjustments"])), (n()(),
            i._18(-1, null, ["\n        "])), (n()(),
            i.Z(210, 0, null, null, 2, "ion-option", [], null, null, null, null, null)), i.Y(211, 16384, [[21, 4]], 0, Y.a, [i.j], null, null), (n()(),
            i._18(-1, null, ["Alerts"])), (n()(),
            i._18(-1, null, ["\n        "])), (n()(),
            i.Z(214, 0, null, null, 2, "ion-option", [], null, null, null, null, null)), i.Y(215, 16384, [[21, 4]], 0, Y.a, [i.j], null, null), (n()(),
            i._18(-1, null, ["Safety concerns"])), (n()(),
            i._18(-1, null, ["\n        "])), (n()(),
            i.Z(218, 0, null, null, 2, "ion-option", [], null, null, null, null, null)), i.Y(219, 16384, [[21, 4]], 0, Y.a, [i.j], null, null), (n()(),
            i._18(-1, null, ["Protecting investment / inventory"])), (n()(),
            i._18(-1, null, ["\n      "])), (n()(),
            i._18(-1, 2, ["\n    "])), (n()(),
            i._18(-1, null, ["\n\n    "])), (n()(),
            i.Z(224, 0, null, null, 1, "p", [], null, null, null, null, null)), (n()(),
            i._18(-1, null, ["Did you purchase a CoolBot Walk-In Cooler?"])), (n()(),
            i._18(-1, null, ["\n    "])), (n()(),
            i.Z(227, 0, null, null, 26, "ion-item", [["class", "item item-block"]], null, null, null, o.b, o.a)), i.Y(228, 1097728, null, 3, a.a, [r.a, s.a, i.j, i.z, [2, c.a]], null, null), i._16(335544320, 22, {
                contentLabel: 0
            }), i._16(603979776, 23, {
                _buttons: 1
            }), i._16(603979776, 24, {
                _icons: 1
            }), i.Y(232, 16384, null, 0, d.a, [], null, null), (n()(),
            i._18(-1, 2, ["\n      "])), (n()(),
            i.Z(234, 0, null, 1, 1, "ion-label", [], null, null, null, null, null)), i.Y(235, 16384, [[22, 4]], 0, h.a, [s.a, i.j, i.z, [8, null], [8, null], [8, null], [8, null]], null, null), (n()(),
            i._18(-1, 2, ["\n      "])), (n()(),
            i.Z(237, 0, null, 3, 15, "ion-select", [["formControlName", "cb_wic_purchased"], ["interface", "action-sheet"], ["placeholder", "Please select..."]], [[2, "select-disabled", null], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "click"], [null, "keyup.space"]], function(n, l, t) {
                var e = !0;
                if ("click" === l) {
                    e = !1 !== i._13(n, 238)._click(t) && e
                }
                if ("keyup.space" === l) {
                    e = !1 !== i._13(n, 238)._keyup() && e
                }
                return e
            }, S.b, S.a)), i.Y(238, 1228800, null, 1, T.a, [C.a, r.a, s.a, i.j, i.z, [2, a.a], E.a], {
                placeholder: [0, "placeholder"],
                interface: [1, "interface"]
            }, null), i._16(603979776, 25, {
                options: 1
            }), i._15(1024, null, m.l, function(n) {
                return [n]
            }, [T.a]), i.Y(241, 671744, null, 0, m.g, [[3, m.d], [8, null], [8, null], [2, m.l]], {
                name: [0, "name"]
            }, null), i._15(2048, null, m.m, null, [m.g]), i.Y(243, 16384, null, 0, m.n, [m.m], null, null), (n()(),
            i._18(-1, null, ["\n        "])), (n()(),
            i.Z(245, 0, null, null, 2, "ion-option", [], null, null, null, null, null)), i.Y(246, 16384, [[25, 4]], 0, Y.a, [i.j], null, null), (n()(),
            i._18(-1, null, ["No, I had my own walk-in cooler room"])), (n()(),
            i._18(-1, null, ["\n        "])), (n()(),
            i.Z(249, 0, null, null, 2, "ion-option", [], null, null, null, null, null)), i.Y(250, 16384, [[25, 4]], 0, Y.a, [i.j], null, null), (n()(),
            i._18(-1, null, ["Yes! I purchased a CoolBot WIC"])), (n()(),
            i._18(-1, null, ["\n      "])), (n()(),
            i._18(-1, 2, ["\n    "])), (n()(),
            i._18(-1, null, ["\n\n    "])), (n()(),
            i.U(16777216, null, null, 1, null, e)), i.Y(256, 16384, null, 0, I.i, [i.I, i.F], {
                ngIf: [0, "ngIf"]
            }, null), (n()(),
            i._18(-1, null, ["\n\n    "])), (n()(),
            i.Z(258, 0, null, null, 2, "button", [["ion-button", ""], ["type", "submit"]], [[8, "disabled", 0]], null, null, p.b, p.a)), i.Y(259, 1097728, null, 0, g.a, [[8, ""], s.a, i.j, i.z], null, null), (n()(),
            i._18(-1, 0, ["Submit"])), (n()(),
            i._18(-1, null, ["\n\n  "])), (n()(),
            i._18(-1, 0, ["\n"])), (n()(),
            i._18(-1, null, ["\n"]))], function(n, l) {
                var t = l.component;
                n(l, 1, 0, "Welcome");
                n(l, 8, 0, t.demographics);
                n(l, 24, 0, "firstname");
                n(l, 42, 0, "lastname");
                n(l, 63, 0, "12");
                n(l, 65, 0, n(l, 66, 0, "999-999-9999", 12));
                n(l, 68, 0, "mobilephone");
                n(l, 71, 0, "tel", "on", "xxx-xxx-xxxx");
                n(l, 89, 0, "Please select...", "action-sheet");
                n(l, 92, 0, "primary_use");
                n(l, 148, 0, "Please select...", "action-sheet");
                n(l, 151, 0, "how_did_you_hear_about_us");
                n(l, 160, 0, "Social media");
                n(l, 191, 0, "Please select...", "action-sheet");
                n(l, 194, 0, "cb_pro_purchase_reason");
                n(l, 238, 0, "Please select...", "action-sheet");
                n(l, 241, 0, "cb_wic_purchased");
                n(l, 256, 0, t.errorMessage)
            }, function(n, l) {
                var t = l.component;
                n(l, 6, 0, i._13(l, 10).ngClassUntouched, i._13(l, 10).ngClassTouched, i._13(l, 10).ngClassPristine, i._13(l, 10).ngClassDirty, i._13(l, 10).ngClassValid, i._13(l, 10).ngClassInvalid, i._13(l, 10).ngClassPending);
                n(l, 23, 0, i._13(l, 26).ngClassUntouched, i._13(l, 26).ngClassTouched, i._13(l, 26).ngClassPristine, i._13(l, 26).ngClassDirty, i._13(l, 26).ngClassValid, i._13(l, 26).ngClassInvalid, i._13(l, 26).ngClassPending);
                n(l, 41, 0, i._13(l, 44).ngClassUntouched, i._13(l, 44).ngClassTouched, i._13(l, 44).ngClassPristine, i._13(l, 44).ngClassDirty, i._13(l, 44).ngClassValid, i._13(l, 44).ngClassInvalid, i._13(l, 44).ngClassPending);
                n(l, 62, 0, i._13(l, 63).minlength ? i._13(l, 63).minlength : null, i._13(l, 70).ngClassUntouched, i._13(l, 70).ngClassTouched, i._13(l, 70).ngClassPristine, i._13(l, 70).ngClassDirty, i._13(l, 70).ngClassValid, i._13(l, 70).ngClassInvalid, i._13(l, 70).ngClassPending);
                n(l, 88, 0, i._13(l, 89)._disabled, i._13(l, 94).ngClassUntouched, i._13(l, 94).ngClassTouched, i._13(l, 94).ngClassPristine, i._13(l, 94).ngClassDirty, i._13(l, 94).ngClassValid, i._13(l, 94).ngClassInvalid, i._13(l, 94).ngClassPending);
                n(l, 147, 0, i._13(l, 148)._disabled, i._13(l, 153).ngClassUntouched, i._13(l, 153).ngClassTouched, i._13(l, 153).ngClassPristine, i._13(l, 153).ngClassDirty, i._13(l, 153).ngClassValid, i._13(l, 153).ngClassInvalid, i._13(l, 153).ngClassPending);
                n(l, 190, 0, i._13(l, 191)._disabled, i._13(l, 196).ngClassUntouched, i._13(l, 196).ngClassTouched, i._13(l, 196).ngClassPristine, i._13(l, 196).ngClassDirty, i._13(l, 196).ngClassValid, i._13(l, 196).ngClassInvalid, i._13(l, 196).ngClassPending);
                n(l, 237, 0, i._13(l, 238)._disabled, i._13(l, 243).ngClassUntouched, i._13(l, 243).ngClassTouched, i._13(l, 243).ngClassPristine, i._13(l, 243).ngClassDirty, i._13(l, 243).ngClassValid, i._13(l, 243).ngClassInvalid, i._13(l, 243).ngClassPending);
                n(l, 258, 0, !t.demographics.valid)
            })
        }
        t.d(l, "a", function() {
            return R
        });
        var i = t(0)
          , o = t(38)
          , a = t(18)
          , r = t(17)
          , s = t(2)
          , c = t(28)
          , d = t(33)
          , h = t(41)
          , p = t(20)
          , g = t(14)
          , f = t(151)
          , _ = t(87)
          , m = t(16)
          , v = t(75)
          , b = t(49)
          , y = t(5)
          , C = t(8)
          , w = t(23)
          , k = t(7)
          , P = t(152)
          , S = t(106)
          , T = t(61)
          , E = t(22)
          , Y = t(60)
          , I = t(10)
          , x = t(204)
          , j = t(21)
          , D = t(19)
          , A = t(64)
          , Z = t(15)
          , N = t(52)
          , O = t(37)
          , M = i.X({
            encapsulation: 2,
            styles: [],
            data: {}
        })
          , R = i.V("page-new-account", x.a, function(n) {
            return i._19(0, [(n()(),
            i.Z(0, 0, null, null, 1, "page-new-account", [], null, null, null, u, M)), i.Y(1, 4243456, null, 0, x.a, [j.a, D.a, A.c, Z.a, N.a, O.a, m.f], null, null)], null, null)
        }, {}, {}, [])
    },
    425: function(n, l, t) {
        "use strict";
        function e(n) {
            return C._19(0, [(n()(),
            C.Z(0, 0, null, null, 2, "button", [["class", "submit-btn"], ["full", ""], ["ion-button", ""], ["type", "button"]], null, [[null, "click"]], function(n, l, t) {
                var e = !0;
                if ("click" === l) {
                    e = !1 !== n.component.pairBle() && e
                }
                return e
            }, w.b, w.a)), C.Y(1, 1097728, null, 0, k.a, [[8, ""], P.a, C.j, C.z], {
                full: [0, "full"]
            }, null), (n()(),
            C._18(-1, 0, ["Next"]))], function(n, l) {
                n(l, 1, 0, "")
            }, null)
        }
        function u(n) {
            return C._19(0, [(n()(),
            C.Z(0, 0, null, null, 2, "a", [["full", ""], ["ion-button", ""], ["target", "_blank"]], [[8, "href", 4]], [[null, "click"]], function(n, l, t) {
                var e = !0;
                if ("click" === l) {
                    e = !1 !== n.component.newPageOpened() && e
                }
                return e
            }, w.b, w.a)), C.Y(1, 1097728, null, 0, k.a, [[8, ""], P.a, C.j, C.z], {
                full: [0, "full"]
            }, null), (n()(),
            C._18(-1, 0, ["Next"]))], function(n, l) {
                n(l, 1, 0, "")
            }, function(n, l) {
                n(l, 0, 0, C._2(1, "", l.component.netListUrl, ""))
            })
        }
        function i(n) {
            return C._19(0, [(n()(),
            C.Z(0, 0, null, null, 2, "button", [["class", "submit-btn"], ["full", ""], ["ion-button", ""], ["type", "button"]], null, [[null, "click"]], function(n, l, t) {
                var e = !0;
                if ("click" === l) {
                    e = !1 !== n.component.nextSlide() && e
                }
                return e
            }, w.b, w.a)), C.Y(1, 1097728, null, 0, k.a, [[8, ""], P.a, C.j, C.z], {
                full: [0, "full"]
            }, null), (n()(),
            C._18(-1, 0, ["Next"]))], function(n, l) {
                n(l, 1, 0, "")
            }, null)
        }
        function o(n) {
            return C._19(0, [(n()(),
            C.Z(0, 0, null, null, 2, "button", [["class", "submit-btn"], ["full", ""], ["ion-button", ""], ["type", "button"]], null, [[null, "click"]], function(n, l, t) {
                var e = !0;
                if ("click" === l) {
                    e = !1 !== n.component.doJumperConfig() && e
                }
                return e
            }, w.b, w.a)), C.Y(1, 1097728, null, 0, k.a, [[8, ""], P.a, C.j, C.z], {
                full: [0, "full"]
            }, null), (n()(),
            C._18(-1, 0, ["Next"]))], function(n, l) {
                n(l, 1, 0, "")
            }, null)
        }
        function a(n) {
            return C._19(0, [(n()(),
            C.Z(0, 0, null, null, 2, "button", [["class", "submit-btn"], ["full", ""], ["ion-button", ""], ["type", "button"]], null, [[null, "click"]], function(n, l, t) {
                var e = !0;
                if ("click" === l) {
                    e = !1 !== n.component.getNetList() && e
                }
                return e
            }, w.b, w.a)), C.Y(1, 1097728, null, 0, k.a, [[8, ""], P.a, C.j, C.z], {
                full: [0, "full"]
            }, null), (n()(),
            C._18(-1, 0, ["Next"]))], function(n, l) {
                n(l, 1, 0, "")
            }, null)
        }
        function r(n) {
            return C._19(0, [(n()(),
            C.Z(0, 0, null, null, 14, "ion-item", [["class", "item item-block"]], null, null, null, S.b, S.a)), C.Y(1, 1097728, null, 3, T.a, [E.a, P.a, C.j, C.z, [2, Y.a]], null, null), C._16(335544320, 2, {
                contentLabel: 0
            }), C._16(603979776, 3, {
                _buttons: 1
            }), C._16(603979776, 4, {
                _icons: 1
            }), C.Y(5, 16384, null, 0, I.a, [], null, null), (n()(),
            C._18(-1, 2, ["\n                  "])), (n()(),
            C.Z(7, 0, null, 3, 6, "ion-input", [["length", "32"], ["name", "ssid"], ["placeholder", "WiFi station"], ["required", ""], ["type", "text"]], [[1, "required", 0], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngModelChange"]], function(n, l, t) {
                var e = !0;
                if ("ngModelChange" === l) {
                    e = !1 !== (n.component.ssid = t) && e
                }
                return e
            }, x.b, x.a)), C.Y(8, 16384, null, 0, j.u, [], {
                required: [0, "required"]
            }, null), C._15(1024, null, j.k, function(n) {
                return [n]
            }, [j.u]), C.Y(10, 671744, null, 0, j.q, [[2, j.d], [2, j.k], [8, null], [8, null]], {
                name: [0, "name"],
                model: [1, "model"]
            }, {
                update: "ngModelChange"
            }), C._15(2048, null, j.m, null, [j.q]), C.Y(12, 16384, null, 0, j.n, [j.m], null, null), C.Y(13, 5423104, null, 0, D.a, [P.a, A.a, E.a, Z.a, C.j, C.z, [2, N.a], [2, T.a], [2, j.m], O.a], {
                type: [0, "type"],
                placeholder: [1, "placeholder"]
            }, null), (n()(),
            C._18(-1, 2, ["\n                "]))], function(n, l) {
                var t = l.component;
                n(l, 8, 0, "");
                n(l, 10, 0, "ssid", t.ssid);
                n(l, 13, 0, "text", "WiFi station")
            }, function(n, l) {
                n(l, 7, 0, C._13(l, 8).required ? "" : null, C._13(l, 12).ngClassUntouched, C._13(l, 12).ngClassTouched, C._13(l, 12).ngClassPristine, C._13(l, 12).ngClassDirty, C._13(l, 12).ngClassValid, C._13(l, 12).ngClassInvalid, C._13(l, 12).ngClassPending)
            })
        }
        function s(n) {
            return C._19(0, [(n()(),
            C.Z(0, 0, null, null, 1, "p", [["class", "input-hint"]], null, null, null, null, null)), (n()(),
            C._18(-1, null, ["Please enter any Upper Case, numbers, and punctuation exactly."]))], null, null)
        }
        function c(n) {
            return C._19(0, [(n()(),
            C.Z(0, 0, null, null, 2, "ion-option", [], null, null, null, null, null)), C.Y(1, 16384, [[8, 4]], 0, M.a, [C.j], null, null), (n()(),
            C._18(2, null, ["", ""]))], null, function(n, l) {
                n(l, 2, 0, l.context.$implicit.ssid)
            })
        }
        function d(n) {
            return C._19(0, [(n()(),
            C.Z(0, 0, null, null, 24, "ion-item", [["class", "item item-block"]], null, null, null, S.b, S.a)), C.Y(1, 1097728, null, 3, T.a, [E.a, P.a, C.j, C.z, [2, Y.a]], null, null), C._16(335544320, 5, {
                contentLabel: 0
            }), C._16(603979776, 6, {
                _buttons: 1
            }), C._16(603979776, 7, {
                _icons: 1
            }), C.Y(5, 16384, null, 0, I.a, [], null, null), (n()(),
            C._18(-1, 2, ["\n                  "])), (n()(),
            C.Z(7, 0, null, 1, 2, "ion-label", [], null, null, null, null, null)), C.Y(8, 16384, [[5, 4]], 0, R.a, [P.a, C.j, C.z, [8, null], [8, null], [8, null], [8, null]], null, null), (n()(),
            C._18(-1, null, ["WiFi station"])), (n()(),
            C._18(-1, 2, ["\n                  "])), (n()(),
            C.Z(11, 0, null, 3, 12, "ion-select", [["interface", "action-sheet"], ["name", "ssid"], ["required", ""]], [[1, "required", 0], [2, "select-disabled", null], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngModelChange"], [null, "click"], [null, "keyup.space"]], function(n, l, t) {
                var e = !0
                  , u = n.component;
                if ("click" === l) {
                    e = !1 !== C._13(n, 14)._click(t) && e
                }
                if ("keyup.space" === l) {
                    e = !1 !== C._13(n, 14)._keyup() && e
                }
                if ("ngModelChange" === l) {
                    e = !1 !== (u.ssid = t) && e
                }
                return e
            }, z.b, z.a)), C.Y(12, 16384, null, 0, j.u, [], {
                required: [0, "required"]
            }, null), C._15(1024, null, j.k, function(n) {
                return [n]
            }, [j.u]), C.Y(14, 1228800, null, 1, F.a, [Z.a, E.a, P.a, C.j, C.z, [2, T.a], L.a], {
                interface: [0, "interface"]
            }, null), C._16(603979776, 8, {
                options: 1
            }), C._15(1024, null, j.l, function(n) {
                return [n]
            }, [F.a]), C.Y(17, 671744, null, 0, j.q, [[2, j.d], [2, j.k], [8, null], [2, j.l]], {
                name: [0, "name"],
                model: [1, "model"]
            }, {
                update: "ngModelChange"
            }), C._15(2048, null, j.m, null, [j.q]), C.Y(19, 16384, null, 0, j.n, [j.m], null, null), (n()(),
            C._18(-1, null, ["\n                    "])), (n()(),
            C.U(16777216, null, null, 1, null, c)), C.Y(22, 802816, null, 0, U.h, [C.I, C.F, C.p], {
                ngForOf: [0, "ngForOf"]
            }, null), (n()(),
            C._18(-1, null, ["\n                  "])), (n()(),
            C._18(-1, 2, ["\n                "]))], function(n, l) {
                var t = l.component;
                n(l, 12, 0, "");
                n(l, 14, 0, "action-sheet");
                n(l, 17, 0, "ssid", t.ssid);
                n(l, 22, 0, t.networks)
            }, function(n, l) {
                n(l, 11, 0, C._13(l, 12).required ? "" : null, C._13(l, 14)._disabled, C._13(l, 19).ngClassUntouched, C._13(l, 19).ngClassTouched, C._13(l, 19).ngClassPristine, C._13(l, 19).ngClassDirty, C._13(l, 19).ngClassValid, C._13(l, 19).ngClassInvalid, C._13(l, 19).ngClassPending)
            })
        }
        function h(n) {
            return C._19(0, [(n()(),
            C.Z(0, 0, null, null, 2, "button", [["color", "light"], ["ion-button", ""], ["item-end", ""], ["type", "button"]], null, [[null, "click"]], function(n, l, t) {
                var e = !0;
                if ("click" === l) {
                    e = !1 !== n.component.getNetList() && e
                }
                return e
            }, w.b, w.a)), C.Y(1, 1097728, [[10, 4]], 0, k.a, [[8, ""], P.a, C.j, C.z], {
                color: [0, "color"]
            }, null), (n()(),
            C._18(-1, 0, ["Refresh list"]))], function(n, l) {
                n(l, 1, 0, "light")
            }, null)
        }
        function p(n) {
            return C._19(0, [(n()(),
            C.Z(0, 0, null, null, 2, "button", [["color", "light"], ["ion-button", ""], ["item-end", ""], ["type", "button"]], null, [[null, "click"]], function(n, l, t) {
                var e = !0;
                if ("click" === l) {
                    e = !1 !== n.component.clearNetList() && e
                }
                return e
            }, w.b, w.a)), C.Y(1, 1097728, [[10, 4]], 0, k.a, [[8, ""], P.a, C.j, C.z], {
                color: [0, "color"]
            }, null), (n()(),
            C._18(-1, 0, ["Enter manually"]))], function(n, l) {
                n(l, 1, 0, "light")
            }, null)
        }
        function g(n) {
            return C._19(0, [(n()(),
            C.Z(0, 0, null, null, 12, "ion-item", [["class", "item item-block"]], null, null, null, S.b, S.a)), C.Y(1, 1097728, null, 3, T.a, [E.a, P.a, C.j, C.z, [2, Y.a]], null, null), C._16(335544320, 9, {
                contentLabel: 0
            }), C._16(603979776, 10, {
                _buttons: 1
            }), C._16(603979776, 11, {
                _icons: 1
            }), C.Y(5, 16384, null, 0, I.a, [], null, null), (n()(),
            C._18(-1, 2, ["\n                  "])), (n()(),
            C.U(16777216, null, 4, 1, null, h)), C.Y(8, 16384, null, 0, U.i, [C.I, C.F], {
                ngIf: [0, "ngIf"]
            }, null), (n()(),
            C._18(-1, 2, ["\n                  "])), (n()(),
            C.U(16777216, null, 4, 1, null, p)), C.Y(11, 16384, null, 0, U.i, [C.I, C.F], {
                ngIf: [0, "ngIf"]
            }, null), (n()(),
            C._18(-1, 2, ["\n                "]))], function(n, l) {
                var t = l.component;
                n(l, 8, 0, t.supportsNetworkRefresh());
                n(l, 11, 0, t.networks.length > 0)
            }, null)
        }
        function f(n) {
            return C._19(0, [(n()(),
            C.Z(0, 0, null, null, 1, "h1", [], null, null, null, null, null)), (n()(),
            C._18(-1, null, ["Finished"]))], null, null)
        }
        function _(n) {
            return C._19(0, [(n()(),
            C.Z(0, 0, null, null, 1, "h1", [], null, null, null, null, null)), (n()(),
            C._18(-1, null, ["Return to WiFi"]))], null, null)
        }
        function m(n) {
            return C._19(0, [(n()(),
            C.Z(0, 0, null, null, 1, "p", [], null, null, null, null, null)), (n()(),
            C._18(1, null, ["Go to your ", "'s network or WiFi settings and make sure it's set back the way it was."]))], null, function(n, l) {
                n(l, 1, 0, l.component.platformNoun)
            })
        }
        function v(n) {
            return C._19(0, [(n()(),
            C.Z(0, 0, null, null, 2, "button", [["block", ""], ["color", "uncertain"], ["ion-button", ""]], null, [[null, "click"]], function(n, l, t) {
                var e = !0;
                if ("click" === l) {
                    e = !1 !== n.component.updateFirmware() && e
                }
                return e
            }, w.b, w.a)), C.Y(1, 1097728, null, 0, k.a, [[8, ""], P.a, C.j, C.z], {
                color: [0, "color"],
                block: [1, "block"]
            }, null), (n()(),
            C._18(2, 0, ["\n            Update firmware to ", "\n          "]))], function(n, l) {
                n(l, 1, 0, "uncertain", "")
            }, function(n, l) {
                n(l, 2, 0, l.component.device.firmwareUpgrade())
            })
        }
        function b(n) {
            return C._19(0, [(n()(),
            C.Z(0, 0, null, null, 22, "ion-card", [], null, null, null, null, null)), C.Y(1, 16384, null, 0, H.a, [P.a, C.j, C.z], null, null), (n()(),
            C._18(-1, null, ["\n        "])), (n()(),
            C.Z(3, 0, null, null, 2, "ion-card-header", [], null, null, null, null, null)), C.Y(4, 16384, null, 0, B.a, [P.a, C.j, C.z], null, null), (n()(),
            C._18(-1, null, ["\n          Firmware upgrade needed\n        "])), (n()(),
            C._18(-1, null, ["\n        "])), (n()(),
            C.Z(7, 0, null, null, 14, "ion-card-content", [], null, null, null, null, null)), C.Y(8, 16384, null, 0, V.a, [P.a, C.j, C.z], null, null), (n()(),
            C._18(-1, null, ["\n          "])), (n()(),
            C.Z(10, 0, null, null, 1, "p", [], null, null, null, null, null)), (n()(),
            C._18(-1, null, [" Your Jumper's firmware is out of date and should be updated for reliable operation. "])), (n()(),
            C._18(-1, null, ["\n          "])), (n()(),
            C.Z(13, 0, null, null, 1, "p", [], null, null, null, null, null)), (n()(),
            C._18(-1, null, [" You can do this now, or later in the Devices tab. "])), (n()(),
            C._18(-1, null, ["\n          "])), (n()(),
            C.Z(16, 0, null, null, 1, "p", [], null, null, null, null, null)), (n()(),
            C._18(-1, null, [" Your Jumper will be offline for a minute or two during the update."])), (n()(),
            C._18(-1, null, ["\n\n          "])), (n()(),
            C.U(16777216, null, null, 1, null, v)), C.Y(20, 16384, null, 0, U.i, [C.I, C.F], {
                ngIf: [0, "ngIf"]
            }, null), (n()(),
            C._18(-1, null, ["\n        "])), (n()(),
            C._18(-1, null, ["\n      "]))], function(n, l) {
                var t = l.component;
                n(l, 20, 0, t.device.firmwareUpgrade && t.device.firmwareUpgrade())
            }, null)
        }
        function y(n) {
            return C._19(0, [C._16(402653184, 1, {
                slides: 0
            }), (n()(),
            C.Z(1, 0, null, null, 391, "single-page", [["page_title", "Set up"]], null, null, null, q.b, q.a)), C.Y(2, 49152, null, 0, W.a, [], {
                page_title: [0, "page_title"]
            }, null), (n()(),
            C._18(-1, 0, ["\n  "])), (n()(),
            C.Z(4, 0, null, 0, 387, "ion-slides", [["pager", "true"], ["paginationType", "progress"]], null, null, null, G.b, G.a)), C.Y(5, 1228800, [[1, 4]], 0, $.a, [P.a, A.a, C.u, [2, K.a], C.j, C.z], {
                pager: [0, "pager"],
                paginationType: [1, "paginationType"]
            }, null), (n()(),
            C._18(-1, 0, ["\n    "])), (n()(),
            C.Z(7, 0, null, 0, 30, "ion-slide", [], null, null, null, J.b, J.a)), C.Y(8, 180224, null, 0, X.a, [C.j, C.z, $.a], null, null), (n()(),
            C._18(-1, 0, ["\n      "])), (n()(),
            C.Z(10, 0, null, 0, 1, "h1", [], null, null, null, null, null)), (n()(),
            C._18(-1, null, ["Set up WiFi"])), (n()(),
            C._18(-1, 0, ["\n      "])), (n()(),
            C.Z(13, 0, null, 0, 19, "div", [["text-left", ""]], null, null, null, null, null)), (n()(),
            C._18(-1, null, ["\n        "])), (n()(),
            C.Z(15, 0, null, null, 1, "p", [], null, null, null, null, null)), (n()(),
            C._18(16, null, ["We'll set up ", " and get it connecting via WiFi."])), (n()(),
            C._18(-1, null, ["\n        "])), (n()(),
            C.Z(18, 0, null, null, 1, "p", [], null, null, null, null, null)), (n()(),
            C._18(-1, null, ["This will require:"])), (n()(),
            C._18(-1, null, ["\n        "])), (n()(),
            C.Z(21, 0, null, null, 10, "ul", [], null, null, null, null, null)), (n()(),
            C._18(-1, null, ["\n          "])), (n()(),
            C.Z(23, 0, null, null, 1, "li", [], null, null, null, null, null)), (n()(),
            C._18(-1, null, ["physical access to the CoolBot"])), (n()(),
            C._18(-1, null, ["\n          "])), (n()(),
            C.Z(26, 0, null, null, 1, "li", [], null, null, null, null, null)), (n()(),
            C._18(-1, null, ["the WiFi password for the network you want to use."])), (n()(),
            C._18(-1, null, ["\n          "])), (n()(),
            C.Z(29, 0, null, null, 1, "li", [], null, null, null, null, null)), (n()(),
            C._18(30, null, ["changing your WiFi settings on this ", ", OR Bluetooth support (on newer devices)."])), (n()(),
            C._18(-1, null, ["\n        "])), (n()(),
            C._18(-1, null, ["\n      "])), (n()(),
            C._18(-1, 0, ["\n      "])), (n()(),
            C.Z(34, 0, null, 0, 2, "button", [["class", "submit-btn"], ["full", ""], ["ion-button", ""], ["type", "button"]], null, [[null, "click"]], function(n, l, t) {
                var e = !0;
                if ("click" === l) {
                    e = !1 !== n.component.checkVersion() && e
                }
                return e
            }, w.b, w.a)), C.Y(35, 1097728, null, 0, k.a, [[8, ""], P.a, C.j, C.z], {
                full: [0, "full"]
            }, null), (n()(),
            C._18(-1, 0, ["Start"])), (n()(),
            C._18(-1, 0, ["\n    "])), (n()(),
            C._18(-1, 0, ["\n\n    "])), (n()(),
            C.Z(39, 0, null, 0, 30, "ion-slide", [], null, null, null, J.b, J.a)), C.Y(40, 180224, null, 0, X.a, [C.j, C.z, $.a], null, null), (n()(),
            C._18(-1, 0, ["\n      "])), (n()(),
            C.Z(42, 0, null, 0, 1, "h1", [], null, null, null, null, null)), (n()(),
            C._18(-1, null, ["Identify your Jumper"])), (n()(),
            C._18(-1, 0, ["\n      "])), (n()(),
            C.Z(45, 0, null, 0, 1, "p", [], null, null, null, null, null)), (n()(),
            C._18(-1, null, ["Look for a version sticker on the bottom of the CoolBot Jumper."])), (n()(),
            C._18(-1, 0, ["\n      "])), (n()(),
            C.Z(48, 0, null, 0, 1, "p", [], null, null, null, null, null)), (n()(),
            C._18(-1, null, ['Is there a sticker with "2022", "2023", or "2024"?'])), (n()(),
            C._18(-1, 0, ["\n      "])), (n()(),
            C.Z(51, 0, null, 0, 1, "p", [], null, null, null, null, null)), (n()(),
            C._18(-1, null, ["If there's no sticker, or the date is older, press Older Jumper."])), (n()(),
            C._18(-1, 0, ["\n      "])), (n()(),
            C.Z(54, 0, null, 0, 2, "button", [["class", "submit-btn"], ["full", ""], ["ion-button", ""], ["type", "button"]], null, [[null, "click"]], function(n, l, t) {
                var e = !0;
                if ("click" === l) {
                    e = !1 !== n.component.yearIs2024() && e
                }
                return e
            }, w.b, w.a)), C.Y(55, 1097728, null, 0, k.a, [[8, ""], P.a, C.j, C.z], {
                full: [0, "full"]
            }, null), (n()(),
            C._18(-1, 0, ["2024"])), (n()(),
            C._18(-1, 0, ["\n      "])), (n()(),
            C.Z(58, 0, null, 0, 2, "button", [["class", "submit-btn"], ["full", ""], ["ion-button", ""], ["type", "button"]], null, [[null, "click"]], function(n, l, t) {
                var e = !0;
                if ("click" === l) {
                    e = !1 !== n.component.yearIs2023() && e
                }
                return e
            }, w.b, w.a)), C.Y(59, 1097728, null, 0, k.a, [[8, ""], P.a, C.j, C.z], {
                full: [0, "full"]
            }, null), (n()(),
            C._18(-1, 0, ["2023"])), (n()(),
            C._18(-1, 0, ["\n      "])), (n()(),
            C.Z(62, 0, null, 0, 2, "button", [["class", "submit-btn"], ["full", ""], ["ion-button", ""], ["type", "button"]], null, [[null, "click"]], function(n, l, t) {
                var e = !0;
                if ("click" === l) {
                    e = !1 !== n.component.yearIs2022() && e
                }
                return e
            }, w.b, w.a)), C.Y(63, 1097728, null, 0, k.a, [[8, ""], P.a, C.j, C.z], {
                full: [0, "full"]
            }, null), (n()(),
            C._18(-1, 0, ["2022"])), (n()(),
            C._18(-1, 0, ["\n      "])), (n()(),
            C.Z(66, 0, null, 0, 2, "button", [["class", "submit-btn"], ["full", ""], ["ion-button", ""], ["type", "button"]], null, [[null, "click"]], function(n, l, t) {
                var e = !0;
                if ("click" === l) {
                    e = !1 !== n.component.yearIsOlder() && e
                }
                return e
            }, w.b, w.a)), C.Y(67, 1097728, null, 0, k.a, [[8, ""], P.a, C.j, C.z], {
                full: [0, "full"]
            }, null), (n()(),
            C._18(-1, 0, ["Older Jumper"])), (n()(),
            C._18(-1, 0, ["\n    "])), (n()(),
            C._18(-1, 0, ["\n\n    "])), (n()(),
            C.Z(71, 0, null, 0, 26, "ion-slide", [], null, null, null, J.b, J.a)), C.Y(72, 180224, null, 0, X.a, [C.j, C.z, $.a], null, null), (n()(),
            C._18(-1, 0, ["\n      "])), (n()(),
            C.Z(74, 0, null, 0, 1, "h1", [], null, null, null, null, null)), (n()(),
            C._18(-1, null, ["Get your CoolBot ready"])), (n()(),
            C._18(-1, 0, ["\n      "])), (n()(),
            C.Z(77, 0, null, 0, 1, "p", [], null, null, null, null, null)), (n()(),
            C._18(-1, null, ["Make sure the CoolBot is powered on."])), (n()(),
            C._18(-1, 0, ["\n      "])), (n()(),
            C.Z(80, 0, null, 0, 7, "p", [], null, null, null, null, null)), (n()(),
            C._18(-1, null, ["If you don't see "])), (n()(),
            C.Z(82, 0, null, null, 1, "b", [], null, null, null, null, null)), (n()(),
            C._18(-1, null, ["E0"])), (n()(),
            C._18(-1, null, [" on the CoolBot's display,\n        "])), (n()(),
            C.Z(85, 0, null, null, 1, "a", [["href", "#"], ["title", "Instructions for factory reset"]], null, [[null, "click"]], function(n, l, t) {
                var e = !0;
                if ("click" === l) {
                    e = !1 !== n.component.showResetInstructions(t) && e
                }
                return e
            }, null, null)), (n()(),
            C._18(-1, null, ["reset the network settings"])), (n()(),
            C._18(-1, null, [".\n      "])), (n()(),
            C._18(-1, 0, ["\n      "])), (n()(),
            C.U(16777216, null, 0, 1, null, e)), C.Y(90, 16384, null, 0, U.i, [C.I, C.F], {
                ngIf: [0, "ngIf"]
            }, null), (n()(),
            C._18(-1, 0, ["\n      "])), (n()(),
            C.U(16777216, null, 0, 1, null, u)), C.Y(93, 16384, null, 0, U.i, [C.I, C.F], {
                ngIf: [0, "ngIf"]
            }, null), (n()(),
            C._18(-1, 0, ["\n      "])), (n()(),
            C.U(16777216, null, 0, 1, null, i)), C.Y(96, 16384, null, 0, U.i, [C.I, C.F], {
                ngIf: [0, "ngIf"]
            }, null), (n()(),
            C._18(-1, 0, ["\n    "])), (n()(),
            C._18(-1, 0, ["\n\n    "])), (n()(),
            C.Z(99, 0, null, 0, 22, "ion-slide", [], null, null, null, J.b, J.a)), C.Y(100, 180224, null, 0, X.a, [C.j, C.z, $.a], null, null), (n()(),
            C._18(-1, 0, ["\n      "])), (n()(),
            C.Z(102, 0, null, 0, 1, "h1", [], null, null, null, null, null)), (n()(),
            C._18(-1, null, ["Connect to your CoolBot"])), (n()(),
            C._18(-1, 0, ["\n      "])), (n()(),
            C.Z(105, 0, null, 0, 3, "p", [], null, null, null, null, null)), (n()(),
            C.Z(106, 0, null, null, 1, "b", [], null, null, null, null, null)), (n()(),
            C._18(107, null, ["Go to this ", "'s WiFi settings"])), (n()(),
            C._18(-1, null, [' and connect to the WiFi station starting with "CoolBot".'])), (n()(),
            C._18(-1, 0, ["\n      "])), (n()(),
            C.Z(110, 0, null, 0, 1, "p", [], null, null, null, null, null)), (n()(),
            C._18(-1, null, ["Wait until it's fully connected.  Accept any warnings about limited Internet connection."])), (n()(),
            C._18(-1, 0, ["\n      "])), (n()(),
            C.Z(113, 0, null, 0, 1, "p", [], null, null, null, null, null)), (n()(),
            C._18(-1, null, ["When it's finished connecting, press Next."])), (n()(),
            C._18(-1, 0, ["\n      "])), (n()(),
            C.U(16777216, null, 0, 1, null, o)), C.Y(117, 16384, null, 0, U.i, [C.I, C.F], {
                ngIf: [0, "ngIf"]
            }, null), (n()(),
            C._18(-1, 0, ["\n      "])), (n()(),
            C.U(16777216, null, 0, 1, null, a)), C.Y(120, 16384, null, 0, U.i, [C.I, C.F], {
                ngIf: [0, "ngIf"]
            }, null), (n()(),
            C._18(-1, 0, ["\n    "])), (n()(),
            C._18(-1, 0, ["\n\n    "])), (n()(),
            C.Z(123, 0, null, 0, 16, "ion-slide", [], null, null, null, J.b, J.a)), C.Y(124, 180224, null, 0, X.a, [C.j, C.z, $.a], null, null), (n()(),
            C._18(-1, 0, ["\n      "])), (n()(),
            C.Z(126, 0, null, 0, 1, "h1", [], null, null, null, null, null)), (n()(),
            C._18(-1, null, ["Pair your CoolBot"])), (n()(),
            C._18(-1, 0, ["\n      "])), (n()(),
            C.Z(129, 0, null, 0, 1, "p", [], null, null, null, null, null)), (n()(),
            C._18(-1, null, ["Press the Next button below to pair with your CoolBot over Bluetooth."])), (n()(),
            C._18(-1, 0, ["\n      "])), (n()(),
            C.Z(132, 0, null, 0, 2, "button", [["class", "submit-btn"], ["full", ""], ["ion-button", ""], ["type", "button"]], null, [[null, "click"]], function(n, l, t) {
                var e = !0;
                if ("click" === l) {
                    e = !1 !== n.component.doBlePair() && e
                }
                return e
            }, w.b, w.a)), C.Y(133, 1097728, null, 0, k.a, [[8, ""], P.a, C.j, C.z], {
                full: [0, "full"]
            }, null), (n()(),
            C._18(-1, 0, ["Next"])), (n()(),
            C._18(-1, 0, ["\n      "])), (n()(),
            C.Z(136, 0, null, 0, 2, "button", [["class", "submit-btn"], ["ion-button", ""], ["outline", ""], ["type", "button"]], null, [[null, "click"]], function(n, l, t) {
                var e = !0;
                if ("click" === l) {
                    e = !1 !== n.component.doJumperPolicy(!1) && e
                }
                return e
            }, w.b, w.a)), C.Y(137, 1097728, null, 0, k.a, [[8, ""], P.a, C.j, C.z], {
                outline: [0, "outline"]
            }, null), (n()(),
            C._18(-1, 0, ["Use WiFi"])), (n()(),
            C._18(-1, 0, ["\n    "])), (n()(),
            C._18(-1, 0, ["\n\n    "])), (n()(),
            C.Z(141, 0, null, 0, 36, "ion-slide", [], null, null, null, J.b, J.a)), C.Y(142, 180224, null, 0, X.a, [C.j, C.z, $.a], null, null), (n()(),
            C._18(-1, 0, ["\n      "])), (n()(),
            C.Z(144, 0, null, 0, 1, "h1", [], null, null, null, null, null)), (n()(),
            C._18(-1, null, ["Configure CoolBot's WiFi"])), (n()(),
            C._18(-1, 0, ["\n      "])), (n()(),
            C.Z(147, 0, null, 0, 29, "div", [], null, null, null, null, null)), (n()(),
            C._18(-1, null, ["\n        "])), (n()(),
            C.Z(149, 0, null, null, 4, "p", [], null, null, null, null, null)), (n()(),
            C._18(-1, null, ["Click the "])), (n()(),
            C.Z(151, 0, null, null, 1, "b", [], null, null, null, null, null)), (n()(),
            C._18(-1, null, ["Configure"])), (n()(),
            C._18(-1, null, [" button below to open a tab that talks directly to the CoolBot."])), (n()(),
            C._18(-1, null, ["\n        "])), (n()(),
            C.Z(155, 0, null, null, 1, "p", [], null, null, null, null, null)), (n()(),
            C._18(-1, null, ["When it finishes, return to this tab and click Next below."])), (n()(),
            C._18(-1, null, ["\n        "])), (n()(),
            C.Z(158, 0, null, null, 3, "p", [], null, null, null, null, null)), (n()(),
            C.Z(159, 0, null, null, 1, "span", [["class", "weirdness"]], null, null, null, null, null)), (n()(),
            C._18(-1, null, ["If the tab is blank or doesn't load,"])), (n()(),
            C._18(-1, null, [" click Alternate Method to restart."])), (n()(),
            C._18(-1, null, ["\n        "])), (n()(),
            C.Z(163, 0, null, null, 2, "button", [["class", "submit-btn"], ["full", ""], ["ion-button", ""], ["type", "button"]], null, [[null, "click"]], function(n, l, t) {
                var e = !0;
                if ("click" === l) {
                    e = !1 !== n.component.configDirectInNewTab() && e
                }
                return e
            }, w.b, w.a)), C.Y(164, 1097728, null, 0, k.a, [[8, ""], P.a, C.j, C.z], {
                full: [0, "full"]
            }, null), (n()(),
            C._18(-1, 0, ["Configure"])), (n()(),
            C._18(-1, null, ["\n        "])), (n()(),
            C.Z(167, 0, null, null, 2, "button", [["class", "submit-btn"], ["full", ""], ["ion-button", ""], ["type", "button"]], null, [[null, "click"]], function(n, l, t) {
                var e = !0;
                if ("click" === l) {
                    e = !1 !== n.component.watchErrorCodes() && e
                }
                return e
            }, w.b, w.a)), C.Y(168, 1097728, null, 0, k.a, [[8, ""], P.a, C.j, C.z], {
                full: [0, "full"]
            }, null), (n()(),
            C._18(-1, 0, ["Next"])), (n()(),
            C._18(-1, null, ["\n        "])), (n()(),
            C.Z(171, 0, null, null, 0, "p", [], null, null, null, null, null)), (n()(),
            C._18(-1, null, ["\n        "])), (n()(),
            C.Z(173, 0, null, null, 2, "button", [["class", "submit-btn"], ["ion-button", ""], ["outline", ""], ["type", "button"]], null, [[null, "click"]], function(n, l, t) {
                var e = !0;
                if ("click" === l) {
                    e = !1 !== n.component.switchToApi() && e
                }
                return e
            }, w.b, w.a)), C.Y(174, 1097728, null, 0, k.a, [[8, ""], P.a, C.j, C.z], {
                outline: [0, "outline"]
            }, null), (n()(),
            C._18(-1, 0, ["Alternate Method"])), (n()(),
            C._18(-1, null, ["\n      "])), (n()(),
            C._18(-1, 0, ["\n    "])), (n()(),
            C._18(-1, 0, ["\n\n    "])), (n()(),
            C.Z(179, 0, null, 0, 12, "ion-slide", [], null, null, null, J.b, J.a)), C.Y(180, 180224, null, 0, X.a, [C.j, C.z, $.a], null, null), (n()(),
            C._18(-1, 0, ["\n      "])), (n()(),
            C.Z(182, 0, null, 0, 1, "h1", [], null, null, null, null, null)), (n()(),
            C._18(-1, null, ["Listing Networks"])), (n()(),
            C._18(-1, 0, ["\n      "])), (n()(),
            C.Z(185, 0, null, 0, 1, "p", [], null, null, null, null, null)), (n()(),
            C._18(-1, null, ["Getting the list of WiFi networks visible to the CoolBot..."])), (n()(),
            C._18(-1, 0, ["\n      "])), (n()(),
            C.Z(188, 0, null, 0, 2, "button", [["class", "submit-btn"], ["ion-button", ""], ["outline", ""], ["type", "button"]], null, [[null, "click"]], function(n, l, t) {
                var e = !0;
                if ("click" === l) {
                    e = !1 !== n.component.skipNetList() && e
                }
                return e
            }, w.b, w.a)), C.Y(189, 1097728, null, 0, k.a, [[8, ""], P.a, C.j, C.z], {
                outline: [0, "outline"]
            }, null), (n()(),
            C._18(-1, 0, ["Skip"])), (n()(),
            C._18(-1, 0, ["\n    "])), (n()(),
            C._18(-1, 0, ["\n\n    "])), (n()(),
            C.Z(193, 0, null, 0, 65, "ion-slide", [], null, null, null, J.b, J.a)), C.Y(194, 180224, null, 0, X.a, [C.j, C.z, $.a], null, null), (n()(),
            C._18(-1, 0, ["\n      "])), (n()(),
            C.Z(196, 0, null, 0, 1, "h1", [], null, null, null, null, null)), (n()(),
            C._18(-1, null, ["WiFi login"])), (n()(),
            C._18(-1, 0, ["\n      "])), (n()(),
            C.Z(199, 0, null, 0, 1, "p", [], null, null, null, null, null)), (n()(),
            C._18(-1, null, ["The CoolBot needs the station name and password for your WiFi."])), (n()(),
            C._18(-1, 0, ["\n      "])), (n()(),
            C.Z(202, 0, null, 0, 55, "form", [["novalidate", ""]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngSubmit"], [null, "submit"], [null, "reset"]], function(n, l, t) {
                var e = !0
                  , u = n.component;
                if ("submit" === l) {
                    e = !1 !== C._13(n, 204).onSubmit(t) && e
                }
                if ("reset" === l) {
                    e = !1 !== C._13(n, 204).onReset() && e
                }
                if ("ngSubmit" === l) {
                    e = !1 !== u.configCoolBot() && e
                }
                return e
            }, null, null)), C.Y(203, 16384, null, 0, j.A, [], null, null), C.Y(204, 4210688, [["registerForm", 4]], 0, j.p, [[8, null], [8, null]], null, {
                ngSubmit: "ngSubmit"
            }), C._15(2048, null, j.d, null, [j.p]), C.Y(206, 16384, null, 0, j.o, [j.d], null, null), (n()(),
            C._18(-1, null, ["\n         "])), (n()(),
            C.Z(208, 0, null, null, 36, "ion-row", [["class", "row"]], null, null, null, null, null)), C.Y(209, 16384, null, 0, Q.a, [], null, null), (n()(),
            C._18(-1, null, ["\n            "])), (n()(),
            C.Z(211, 0, null, null, 32, "ion-col", [["class", "col"]], null, null, null, null, null)), C.Y(212, 16384, null, 0, nn.a, [], null, null), (n()(),
            C._18(-1, null, ["\n              "])), (n()(),
            C.Z(214, 0, null, null, 28, "ion-list", [["inset", ""]], null, null, null, null, null)), C.Y(215, 16384, null, 0, ln.a, [P.a, C.j, C.z, A.a, tn.l, O.a], null, null), (n()(),
            C._18(-1, null, ["\n               \n                "])), (n()(),
            C.U(16777216, null, null, 1, null, r)), C.Y(218, 16384, null, 0, U.i, [C.I, C.F], {
                ngIf: [0, "ngIf"]
            }, null), (n()(),
            C._18(-1, null, ["\n                "])), (n()(),
            C.U(16777216, null, null, 1, null, s)), C.Y(221, 16384, null, 0, U.i, [C.I, C.F], {
                ngIf: [0, "ngIf"]
            }, null), (n()(),
            C._18(-1, null, ["\n\n                "])), (n()(),
            C.U(16777216, null, null, 1, null, d)), C.Y(224, 16384, null, 0, U.i, [C.I, C.F], {
                ngIf: [0, "ngIf"]
            }, null), (n()(),
            C._18(-1, null, ["\n                "])), (n()(),
            C.U(16777216, null, null, 1, null, g)), C.Y(227, 16384, null, 0, U.i, [C.I, C.F], {
                ngIf: [0, "ngIf"]
            }, null), (n()(),
            C._18(-1, null, ["\n\n                "])), (n()(),
            C.Z(229, 0, null, null, 12, "ion-item", [["class", "item item-block"]], null, null, null, S.b, S.a)), C.Y(230, 1097728, null, 3, T.a, [E.a, P.a, C.j, C.z, [2, Y.a]], null, null), C._16(335544320, 12, {
                contentLabel: 0
            }), C._16(603979776, 13, {
                _buttons: 1
            }), C._16(603979776, 14, {
                _icons: 1
            }), C.Y(234, 16384, null, 0, I.a, [], null, null), (n()(),
            C._18(-1, 2, ["\n                  "])), (n()(),
            C.Z(236, 0, null, 3, 4, "ion-input", [["length", "32"], ["name", "password"], ["placeholder", "Password"], ["type", "text"]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngModelChange"]], function(n, l, t) {
                var e = !0;
                if ("ngModelChange" === l) {
                    e = !1 !== (n.component.password = t) && e
                }
                return e
            }, x.b, x.a)), C.Y(237, 671744, null, 0, j.q, [[2, j.d], [8, null], [8, null], [8, null]], {
                name: [0, "name"],
                model: [1, "model"]
            }, {
                update: "ngModelChange"
            }), C._15(2048, null, j.m, null, [j.q]), C.Y(239, 16384, null, 0, j.n, [j.m], null, null), C.Y(240, 5423104, null, 0, D.a, [P.a, A.a, E.a, Z.a, C.j, C.z, [2, N.a], [2, T.a], [2, j.m], O.a], {
                type: [0, "type"],
                placeholder: [1, "placeholder"]
            }, null), (n()(),
            C._18(-1, 2, ["\n                "])), (n()(),
            C._18(-1, null, ["\n\n              "])), (n()(),
            C._18(-1, null, ["\n            "])), (n()(),
            C._18(-1, null, ["\n         "])), (n()(),
            C._18(-1, null, ["\n         "])), (n()(),
            C.Z(246, 0, null, null, 10, "ion-row", [["class", "row"]], null, null, null, null, null)), C.Y(247, 16384, null, 0, Q.a, [], null, null), (n()(),
            C._18(-1, null, ["\n           "])), (n()(),
            C.Z(249, 0, null, null, 6, "ion-col", [["class", "signup-col col"]], null, null, null, null, null)), C.Y(250, 16384, null, 0, nn.a, [], null, null), (n()(),
            C._18(-1, null, ["\n             "])), (n()(),
            C.Z(252, 0, null, null, 2, "button", [["class", "submit-btn"], ["full", ""], ["ion-button", ""], ["type", "submit"]], [[8, "disabled", 0]], null, null, w.b, w.a)), C.Y(253, 1097728, null, 0, k.a, [[8, ""], P.a, C.j, C.z], {
                full: [0, "full"]
            }, null), (n()(),
            C._18(-1, 0, ["Next"])), (n()(),
            C._18(-1, null, ["\n           "])), (n()(),
            C._18(-1, null, ["\n         "])), (n()(),
            C._18(-1, null, ["\n      "])), (n()(),
            C._18(-1, 0, ["\n    "])), (n()(),
            C._18(-1, 0, ["\n\n    "])), (n()(),
            C.Z(260, 0, null, 0, 31, "ion-slide", [], null, null, null, J.b, J.a)), C.Y(261, 180224, null, 0, X.a, [C.j, C.z, $.a], null, null), (n()(),
            C._18(-1, 0, ["\n      "])), (n()(),
            C.Z(263, 0, null, 0, 1, "h1", [], null, null, null, null, null)), (n()(),
            C._18(-1, null, ["Configuring CoolBot's WiFi..."])), (n()(),
            C._18(-1, 0, ["\n      "])), (n()(),
            C.Z(266, 0, null, 0, 14, "div", [], [[8, "hidden", 0]], null, null, null, null)), (n()(),
            C._18(-1, null, ["\n        "])), (n()(),
            C.Z(268, 0, null, null, 1, "p", [], null, null, null, null, null)), (n()(),
            C._18(-1, null, ["We're telling your CoolBot how to connect to the Internet and to the CoolBot service now."])), (n()(),
            C._18(-1, null, ["\n        "])), (n()(),
            C.Z(271, 0, null, null, 4, "p", [], null, null, null, null, null)), (n()(),
            C._18(-1, null, ["Wait until "])), (n()(),
            C.Z(273, 0, null, null, 1, "b", [], null, null, null, null, null)), (n()(),
            C._18(-1, null, ['the CoolBot error code is no longer "E0" or "E1"'])), (n()(),
            C._18(-1, null, [", then press Next."])), (n()(),
            C._18(-1, null, ["\n        "])), (n()(),
            C.Z(277, 0, null, null, 2, "button", [["class", "submit-btn"], ["full", ""], ["ion-button", ""], ["type", "button"]], null, [[null, "click"]], function(n, l, t) {
                var e = !0;
                if ("click" === l) {
                    e = !1 !== n.component.watchErrorCodes() && e
                }
                return e
            }, w.b, w.a)), C.Y(278, 1097728, null, 0, k.a, [[8, ""], P.a, C.j, C.z], {
                full: [0, "full"]
            }, null), (n()(),
            C._18(-1, 0, ["Next"])), (n()(),
            C._18(-1, null, ["\n      "])), (n()(),
            C._18(-1, 0, ["\n      "])), (n()(),
            C.Z(282, 0, null, 0, 8, "div", [], [[8, "hidden", 0]], null, null, null, null)), (n()(),
            C._18(-1, null, ["\n        "])), (n()(),
            C.Z(284, 0, null, null, 1, "p", [], null, null, null, null, null)), (n()(),
            C._18(285, null, ["", ""])), (n()(),
            C._18(-1, null, ["\n        "])), (n()(),
            C.Z(287, 0, null, null, 2, "button", [["class", "submit-btn"], ["ion-button", ""], ["outline", ""], ["type", "button"]], null, [[null, "click"]], function(n, l, t) {
                var e = !0;
                if ("click" === l) {
                    e = !1 !== n.component.introduceFallbackConfig() && e
                }
                return e
            }, w.b, w.a)), C.Y(288, 1097728, null, 0, k.a, [[8, ""], P.a, C.j, C.z], {
                outline: [0, "outline"]
            }, null), (n()(),
            C._18(-1, 0, ["Alternate Method"])), (n()(),
            C._18(-1, null, ["\n      "])), (n()(),
            C._18(-1, 0, ["\n    "])), (n()(),
            C._18(-1, 0, ["\n\n    "])), (n()(),
            C.Z(293, 0, null, 0, 33, "ion-slide", [], null, null, null, J.b, J.a)), C.Y(294, 180224, null, 0, X.a, [C.j, C.z, $.a], null, null), (n()(),
            C._18(-1, 0, ["\n      "])), (n()(),
            C.Z(296, 0, null, 0, 1, "h1", [], null, null, null, null, null)), (n()(),
            C._18(-1, null, ["Configure CoolBot's WiFi"])), (n()(),
            C._18(-1, 0, ["\n      "])), (n()(),
            C.Z(299, 0, null, 0, 26, "div", [], null, null, null, null, null)), (n()(),
            C._18(-1, null, ["\n        "])), (n()(),
            C.Z(301, 0, null, null, 4, "p", [], null, null, null, null, null)), (n()(),
            C._18(-1, null, ["Click the "])), (n()(),
            C.Z(303, 0, null, null, 1, "b", [], null, null, null, null, null)), (n()(),
            C._18(-1, null, ["Configure"])), (n()(),
            C._18(-1, null, [" button below to open a tab that talks directly to the CoolBot."])), (n()(),
            C._18(-1, null, ["\n        "])), (n()(),
            C.Z(307, 0, null, null, 3, "p", [], null, null, null, null, null)), (n()(),
            C.Z(308, 0, null, null, 1, "span", [["class", "weirdness"]], null, null, null, null, null)), (n()(),
            C._18(-1, null, ["The tab may be blank or show errors;"])), (n()(),
            C._18(-1, null, [" that's OK."])), (n()(),
            C._18(-1, null, ["\n        "])), (n()(),
            C.Z(312, 0, null, null, 4, "p", [], null, null, null, null, null)), (n()(),
            C._18(-1, null, ["After the tab opens, close it, return to this tab, and press the "])), (n()(),
            C.Z(314, 0, null, null, 1, "b", [], null, null, null, null, null)), (n()(),
            C._18(-1, null, ["Tab Closed"])), (n()(),
            C._18(-1, null, [" button below."])), (n()(),
            C._18(-1, null, ["\n        "])), (n()(),
            C.Z(318, 0, null, null, 2, "button", [["class", "submit-btn"], ["full", ""], ["ion-button", ""], ["type", "button"]], null, [[null, "click"]], function(n, l, t) {
                var e = !0;
                if ("click" === l) {
                    e = !1 !== n.component.configInNewTab() && e
                }
                return e
            }, w.b, w.a)), C.Y(319, 1097728, null, 0, k.a, [[8, ""], P.a, C.j, C.z], {
                full: [0, "full"]
            }, null), (n()(),
            C._18(-1, 0, ["Configure"])), (n()(),
            C._18(-1, null, ["\n        "])), (n()(),
            C.Z(322, 0, null, null, 2, "button", [["class", "submit-btn"], ["full", ""], ["ion-button", ""], ["type", "button"]], null, [[null, "click"]], function(n, l, t) {
                var e = !0;
                if ("click" === l) {
                    e = !1 !== n.component.watchErrorCodes() && e
                }
                return e
            }, w.b, w.a)), C.Y(323, 1097728, null, 0, k.a, [[8, ""], P.a, C.j, C.z], {
                full: [0, "full"]
            }, null), (n()(),
            C._18(-1, 0, ["Tab Closed"])), (n()(),
            C._18(-1, null, ["\n      "])), (n()(),
            C._18(-1, 0, ["\n    "])), (n()(),
            C._18(-1, 0, ["\n\n    "])), (n()(),
            C.Z(328, 0, null, 0, 22, "ion-slide", [], null, null, null, J.b, J.a)), C.Y(329, 180224, null, 0, X.a, [C.j, C.z, $.a], null, null), (n()(),
            C._18(-1, 0, ["\n      "])), (n()(),
            C.Z(331, 0, null, 0, 1, "h1", [], null, null, null, null, null)), (n()(),
            C._18(-1, null, ["Watch error codes"])), (n()(),
            C._18(-1, 0, ["\n      "])), (n()(),
            C.Z(334, 0, null, 0, 1, "p", [], null, null, null, null, null)), (n()(),
            C._18(-1, null, ["Your CoolBot should flash several codes as it inspects the network and connects to the CoolBot service."])), (n()(),
            C._18(-1, 0, ["\n      "])), (n()(),
            C.Z(337, 0, null, 0, 5, "p", [], null, null, null, null, null)), (n()(),
            C._18(-1, null, ['If it returns to "E0", check your WiFi credentials, reposition the Jumper and\n        '])), (n()(),
            C.Z(339, 0, null, null, 2, "button", [["ion-button", ""], ["outline", ""], ["type", "button"]], null, [[null, "click"]], function(n, l, t) {
                var e = !0;
                if ("click" === l) {
                    e = !1 !== n.component.startAgain() && e
                }
                return e
            }, w.b, w.a)), C.Y(340, 1097728, null, 0, k.a, [[8, ""], P.a, C.j, C.z], {
                outline: [0, "outline"]
            }, null), (n()(),
            C._18(-1, 0, ["Try again"])), (n()(),
            C._18(-1, null, ["\n      "])), (n()(),
            C._18(-1, 0, ["\n      "])), (n()(),
            C.Z(344, 0, null, 0, 1, "p", [], null, null, null, null, null)), (n()(),
            C._18(-1, null, ['Once it stops flashing "E" codes, press Next.'])), (n()(),
            C._18(-1, 0, ["\n      "])), (n()(),
            C.Z(347, 0, null, 0, 2, "button", [["class", "submit-btn"], ["full", ""], ["ion-button", ""], ["type", "button"]], null, [[null, "click"]], function(n, l, t) {
                var e = !0;
                if ("click" === l) {
                    e = !1 !== n.component.sayFinished() && e
                }
                return e
            }, w.b, w.a)), C.Y(348, 1097728, null, 0, k.a, [[8, ""], P.a, C.j, C.z], {
                full: [0, "full"]
            }, null), (n()(),
            C._18(-1, 0, ["Next"])), (n()(),
            C._18(-1, 0, ["\n    "])), (n()(),
            C._18(-1, 0, ["\n\n    "])), (n()(),
            C.Z(352, 0, null, 0, 15, "ion-slide", [], null, null, null, J.b, J.a)), C.Y(353, 180224, null, 0, X.a, [C.j, C.z, $.a], null, null), (n()(),
            C._18(-1, 0, ["\n      "])), (n()(),
            C.Z(355, 0, null, 0, 1, "h1", [], null, null, null, null, null)), (n()(),
            C._18(-1, null, ["Reset WiFi"])), (n()(),
            C._18(-1, 0, ["\n      "])), (n()(),
            C.Z(358, 0, null, 0, 1, "p", [], null, null, null, null, null)), (n()(),
            C._18(-1, null, ["We'll need to configure your CoolBot an alternate way."])), (n()(),
            C._18(-1, 0, ["\n      "])), (n()(),
            C.Z(361, 0, null, 0, 1, "p", [], null, null, null, null, null)), (n()(),
            C._18(362, null, ["Go to your ", "'s network or WiFi settings and make sure it's set back the way it was."])), (n()(),
            C._18(-1, 0, ["\n      "])), (n()(),
            C.Z(364, 0, null, 0, 2, "button", [["class", "submit-btn"], ["full", ""], ["ion-button", ""], ["type", "button"]], null, [[null, "click"]], function(n, l, t) {
                var e = !0;
                if ("click" === l) {
                    e = !1 !== n.component.startAgain() && e
                }
                return e
            }, w.b, w.a)), C.Y(365, 1097728, null, 0, k.a, [[8, ""], P.a, C.j, C.z], {
                full: [0, "full"]
            }, null), (n()(),
            C._18(-1, 0, ["Next"])), (n()(),
            C._18(-1, 0, ["\n    "])), (n()(),
            C._18(-1, 0, ["\n\n    "])), (n()(),
            C.Z(369, 0, null, 0, 21, "ion-slide", [], null, null, null, J.b, J.a)), C.Y(370, 180224, null, 0, X.a, [C.j, C.z, $.a], null, null), (n()(),
            C._18(-1, 0, ["\n      "])), (n()(),
            C.U(16777216, null, 0, 1, null, f)), C.Y(373, 16384, null, 0, U.i, [C.I, C.F], {
                ngIf: [0, "ngIf"]
            }, null), (n()(),
            C._18(-1, 0, ["\n      "])), (n()(),
            C.U(16777216, null, 0, 1, null, _)), C.Y(376, 16384, null, 0, U.i, [C.I, C.F], {
                ngIf: [0, "ngIf"]
            }, null), (n()(),
            C._18(-1, 0, ["\n      "])), (n()(),
            C.Z(378, 0, null, 0, 1, "p", [], null, null, null, null, null)), (n()(),
            C._18(-1, null, ["Your CoolBot is configured and connected to WiFi."])), (n()(),
            C._18(-1, 0, ["\n      "])), (n()(),
            C.U(16777216, null, 0, 1, null, m)), C.Y(382, 16384, null, 0, U.i, [C.I, C.F], {
                ngIf: [0, "ngIf"]
            }, null), (n()(),
            C._18(-1, 0, ["\n\n      "])), (n()(),
            C.U(16777216, null, 0, 1, null, b)), C.Y(385, 16384, null, 0, U.i, [C.I, C.F], {
                ngIf: [0, "ngIf"]
            }, null), (n()(),
            C._18(-1, 0, ["\n\n      "])), (n()(),
            C.Z(387, 0, null, 0, 2, "button", [["class", "submit-btn"], ["full", ""], ["ion-button", ""], ["type", "button"]], null, [[null, "click"]], function(n, l, t) {
                var e = !0;
                if ("click" === l) {
                    e = !1 !== n.component.finish() && e
                }
                return e
            }, w.b, w.a)), C.Y(388, 1097728, null, 0, k.a, [[8, ""], P.a, C.j, C.z], {
                full: [0, "full"]
            }, null), (n()(),
            C._18(-1, 0, ["Finished"])), (n()(),
            C._18(-1, 0, ["\n    "])), (n()(),
            C._18(-1, 0, ["\n  "])), (n()(),
            C._18(-1, 0, ["\n"])), (n()(),
            C._18(-1, null, ["\n"]))], function(n, l) {
                var t = l.component;
                n(l, 2, 0, "Set up");
                n(l, 5, 0, "true", "progress");
                n(l, 35, 0, "");
                n(l, 55, 0, "");
                n(l, 59, 0, "");
                n(l, 63, 0, "");
                n(l, 67, 0, "");
                n(l, 90, 0, "BLE" == t.provisPolicy);
                n(l, 93, 0, "BLE" != t.provisPolicy && "" != t.netListUrl);
                n(l, 96, 0, "BLE" != t.provisPolicy && "" == t.netListUrl);
                n(l, 117, 0, "JUMPER" == t.provisPolicy);
                n(l, 120, 0, "JUMPER" != t.provisPolicy);
                n(l, 133, 0, "");
                n(l, 137, 0, "");
                n(l, 164, 0, "");
                n(l, 168, 0, "");
                n(l, 174, 0, "");
                n(l, 189, 0, "");
                n(l, 218, 0, 0 == t.networks.length);
                n(l, 221, 0, 0 == t.networks.length);
                n(l, 224, 0, t.networks.length > 0);
                n(l, 227, 0, t.networks.length > 0 || t.supportsNetworkRefresh());
                n(l, 237, 0, "password", t.password);
                n(l, 240, 0, "text", "Password");
                n(l, 253, 0, "");
                n(l, 278, 0, "");
                n(l, 288, 0, "");
                n(l, 319, 0, "");
                n(l, 323, 0, "");
                n(l, 340, 0, "");
                n(l, 348, 0, "");
                n(l, 365, 0, "");
                n(l, 373, 0, "BLE" == t.provisPolicy);
                n(l, 376, 0, "BLE" != t.provisPolicy);
                n(l, 382, 0, "BLE" != t.provisPolicy);
                n(l, 385, 0, t.device.firmwareUpgrade && t.device.firmwareUpgrade());
                n(l, 388, 0, "")
            }, function(n, l) {
                var t = l.component;
                n(l, 16, 0, t.device.longTitle(!1));
                n(l, 30, 0, t.platformNoun);
                n(l, 107, 0, t.platformNoun);
                n(l, 202, 0, C._13(l, 206).ngClassUntouched, C._13(l, 206).ngClassTouched, C._13(l, 206).ngClassPristine, C._13(l, 206).ngClassDirty, C._13(l, 206).ngClassValid, C._13(l, 206).ngClassInvalid, C._13(l, 206).ngClassPending);
                n(l, 236, 0, C._13(l, 239).ngClassUntouched, C._13(l, 239).ngClassTouched, C._13(l, 239).ngClassPristine, C._13(l, 239).ngClassDirty, C._13(l, 239).ngClassValid, C._13(l, 239).ngClassInvalid, C._13(l, 239).ngClassPending);
                n(l, 252, 0, !C._13(l, 204).form.valid);
                n(l, 266, 0, !!t.errorMessage);
                n(l, 282, 0, !t.errorMessage);
                n(l, 285, 0, t.errorMessage);
                n(l, 362, 0, t.platformNoun)
            })
        }
        t.d(l, "a", function() {
            return pn
        });
        var C = t(0)
          , w = t(20)
          , k = t(14)
          , P = t(2)
          , S = t(38)
          , T = t(18)
          , E = t(17)
          , Y = t(28)
          , I = t(33)
          , x = t(75)
          , j = t(16)
          , D = t(49)
          , A = t(5)
          , Z = t(8)
          , N = t(23)
          , O = t(7)
          , M = t(60)
          , R = t(41)
          , z = t(106)
          , F = t(61)
          , L = t(22)
          , U = t(10)
          , H = t(73)
          , B = t(80)
          , V = t(74)
          , q = t(151)
          , W = t(87)
          , G = t(522)
          , $ = t(84)
          , K = t(6)
          , J = t(523)
          , X = t(140)
          , Q = t(43)
          , nn = t(42)
          , ln = t(30)
          , tn = t(9)
          , en = t(77)
          , un = t(21)
          , on = t(19)
          , an = t(15)
          , rn = t(92)
          , sn = t(88)
          , cn = t(37)
          , dn = t(137)
          , hn = C.X({
            encapsulation: 2,
            styles: [],
            data: {}
        })
          , pn = C.V("page-new-device", en.a, function(n) {
            return C._19(0, [(n()(),
            C.Z(0, 0, null, null, 1, "page-new-device", [], null, null, null, y, hn)), C.Y(1, 4374528, null, 0, en.a, [un.a, on.a, A.a, an.a, rn.d, Z.a, sn.a, cn.a, dn.a], null, null)], null, null)
        }, {}, {}, [])
    },
    426: function(n, l, t) {
        "use strict";
        function e(n) {
            return u._19(0, [(n()(),
            u._18(-1, null, ["\n"])), (n()(),
            u.Z(1, 0, null, null, 14, "ion-card", [], null, null, null, null, null)), u.Y(2, 16384, null, 0, i.a, [o.a, u.j, u.z], null, null), (n()(),
            u._18(-1, null, ["\n  "])), (n()(),
            u.Z(4, 0, null, null, 3, "ion-card-header", [], null, null, null, null, null)), u.Y(5, 16384, null, 0, a.a, [o.a, u.j, u.z], null, null), (n()(),
            u.Z(6, 0, null, null, 1, "h2", [], null, null, null, null, null)), (n()(),
            u._18(-1, null, ["Join CoolBot Rewards"])), (n()(),
            u._18(-1, null, ["\n  "])), (n()(),
            u.Z(9, 0, null, null, 5, "ion-card-content", [], null, null, null, null, null)), u.Y(10, 16384, null, 0, r.a, [o.a, u.j, u.z], null, null), (n()(),
            u._18(-1, null, ["\n    "])), (n()(),
            u.Z(12, 0, null, null, 1, "p", [], null, null, null, null, null)), (n()(),
            u._18(-1, null, ["Know someone who needs a CoolBot Pro? Earn $25 per referral, and give your friends $25 off."])), (n()(),
            u._18(-1, null, ["\n  "])), (n()(),
            u._18(-1, null, ["\n"])), (n()(),
            u._18(-1, null, ["\n"])), (n()(),
            u.Z(17, 0, null, null, 38, "ion-list", [], null, null, null, null, null)), u.Y(18, 16384, null, 0, s.a, [o.a, u.j, u.z, c.a, d.l, h.a], null, null), (n()(),
            u._18(-1, null, ["\n  "])), (n()(),
            u.Z(20, 0, null, null, 10, "ion-item", [["class", "item item-block"], ["text-center", ""]], null, null, null, p.b, p.a)), u.Y(21, 1097728, null, 3, g.a, [f.a, o.a, u.j, u.z, [2, _.a]], null, null), u._16(335544320, 1, {
                contentLabel: 0
            }), u._16(603979776, 2, {
                _buttons: 1
            }), u._16(603979776, 3, {
                _icons: 1
            }), u.Y(25, 16384, null, 0, m.a, [], null, null), (n()(),
            u._18(-1, 2, ["\n    "])), (n()(),
            u.Z(27, 0, null, 2, 2, "a", [["href", "https://storeitcold.referralrock.com/promotion/2"], ["ion-button", ""], ["round", ""], ["target", "_blank"]], null, [[null, "click"]], function(n, l, t) {
                var e = !0;
                if ("click" === l) {
                    e = !1 !== n.component.refer() && e
                }
                return e
            }, v.b, v.a)), u.Y(28, 1097728, [[2, 4]], 0, b.a, [[8, ""], o.a, u.j, u.z], {
                round: [0, "round"]
            }, null), (n()(),
            u._18(-1, 0, ["Find out more"])), (n()(),
            u._18(-1, 2, ["\n  "])), (n()(),
            u._18(-1, null, ["\n  "])), (n()(),
            u.Z(32, 0, null, null, 10, "ion-item", [["class", "item item-block"], ["text-center", ""]], null, null, null, p.b, p.a)), u.Y(33, 1097728, null, 3, g.a, [f.a, o.a, u.j, u.z, [2, _.a]], null, null), u._16(335544320, 4, {
                contentLabel: 0
            }), u._16(603979776, 5, {
                _buttons: 1
            }), u._16(603979776, 6, {
                _icons: 1
            }), u.Y(37, 16384, null, 0, m.a, [], null, null), (n()(),
            u._18(-1, 2, ["\n    "])), (n()(),
            u.Z(39, 0, null, 2, 2, "button", [["color", "light"], ["ion-button", ""], ["round", ""]], null, [[null, "click"]], function(n, l, t) {
                var e = !0;
                if ("click" === l) {
                    e = !1 !== n.component.no() && e
                }
                return e
            }, v.b, v.a)), u.Y(40, 1097728, [[5, 4]], 0, b.a, [[8, ""], o.a, u.j, u.z], {
                color: [0, "color"],
                round: [1, "round"]
            }, null), (n()(),
            u._18(-1, 0, ["No thanks"])), (n()(),
            u._18(-1, 2, ["\n  "])), (n()(),
            u._18(-1, null, ["\n  "])), (n()(),
            u.Z(44, 0, null, null, 10, "ion-item", [["class", "item item-block"], ["text-center", ""]], null, null, null, p.b, p.a)), u.Y(45, 1097728, null, 3, g.a, [f.a, o.a, u.j, u.z, [2, _.a]], null, null), u._16(335544320, 7, {
                contentLabel: 0
            }), u._16(603979776, 8, {
                _buttons: 1
            }), u._16(603979776, 9, {
                _icons: 1
            }), u.Y(49, 16384, null, 0, m.a, [], null, null), (n()(),
            u._18(-1, 2, ["\n    "])), (n()(),
            u.Z(51, 0, null, 2, 2, "button", [["color", "light"], ["ion-button", ""], ["round", ""]], null, [[null, "click"]], function(n, l, t) {
                var e = !0;
                if ("click" === l) {
                    e = !1 !== n.component.snooze() && e
                }
                return e
            }, v.b, v.a)), u.Y(52, 1097728, [[8, 4]], 0, b.a, [[8, ""], o.a, u.j, u.z], {
                color: [0, "color"],
                round: [1, "round"]
            }, null), (n()(),
            u._18(-1, 0, ["Remind me later"])), (n()(),
            u._18(-1, 2, ["\n  "])), (n()(),
            u._18(-1, null, ["\n"])), (n()(),
            u._18(-1, null, ["\n"]))], function(n, l) {
                n(l, 28, 0, "");
                n(l, 40, 0, "light", "");
                n(l, 52, 0, "light", "")
            }, null)
        }
        t.d(l, "a", function() {
            return P
        });
        var u = t(0)
          , i = t(73)
          , o = t(2)
          , a = t(80)
          , r = t(74)
          , s = t(30)
          , c = t(5)
          , d = t(9)
          , h = t(7)
          , p = t(38)
          , g = t(18)
          , f = t(17)
          , _ = t(28)
          , m = t(33)
          , v = t(20)
          , b = t(14)
          , y = t(113)
          , C = t(6)
          , w = t(19)
          , k = u.X({
            encapsulation: 2,
            styles: [],
            data: {}
        })
          , P = u.V("page-referral", y.a, function(n) {
            return u._19(0, [(n()(),
            u.Z(0, 0, null, null, 1, "page-referral", [], null, null, null, e, k)), u.Y(1, 49152, null, 0, y.a, [C.a, w.a], null, null)], null, null)
        }, {}, {}, [])
    },
    427: function(n, l, t) {
        "use strict";
        function e(n) {
            return b._19(0, [(n()(),
            b.Z(0, 0, null, null, 14, "ion-item", [["class", "item item-block"], ["color", "primary"]], null, null, null, y.b, y.a)), b.Y(1, 1097728, null, 3, C.a, [w.a, k.a, b.j, b.z, [2, P.a]], {
                color: [0, "color"]
            }, null), b._16(335544320, 1, {
                contentLabel: 0
            }), b._16(603979776, 2, {
                _buttons: 1
            }), b._16(603979776, 3, {
                _icons: 1
            }), b.Y(5, 16384, null, 0, S.a, [], null, null), (n()(),
            b._18(-1, 2, ["\n          "])), (n()(),
            b.Z(7, 0, null, 1, 2, "ion-label", [], null, null, null, null, null)), b.Y(8, 16384, [[1, 4]], 0, T.a, [k.a, b.j, b.z, [8, null], [8, null], [8, null], [8, null]], null, null), (n()(),
            b._18(-1, null, ["Masquerading"])), (n()(),
            b._18(-1, 2, ["\n          "])), (n()(),
            b.Z(11, 0, null, 4, 2, "button", [["color", "light"], ["ion-button", ""], ["item-end", ""]], null, [[null, "click"]], function(n, l, t) {
                var e = !0;
                if ("click" === l) {
                    e = !1 !== n.component.masquerade.stopMasquerading() && e
                }
                return e
            }, E.b, E.a)), b.Y(12, 1097728, [[2, 4]], 0, Y.a, [[8, ""], k.a, b.j, b.z], {
                color: [0, "color"]
            }, null), (n()(),
            b._18(-1, 0, ["Stop"])), (n()(),
            b._18(-1, 2, ["\n        "]))], function(n, l) {
                n(l, 1, 0, "primary");
                n(l, 12, 0, "light")
            }, null)
        }
        function u(n) {
            return b._19(0, [(n()(),
            b.Z(0, 0, null, null, 17, "ion-item", [["class", "item item-block"]], null, null, null, y.b, y.a)), b.Y(1, 1097728, null, 3, C.a, [w.a, k.a, b.j, b.z, [2, P.a]], null, null), b._16(335544320, 4, {
                contentLabel: 0
            }), b._16(603979776, 5, {
                _buttons: 1
            }), b._16(603979776, 6, {
                _icons: 1
            }), b.Y(5, 16384, null, 0, S.a, [], null, null), (n()(),
            b._18(-1, 2, ["\n          "])), (n()(),
            b.Z(7, 0, null, 1, 2, "ion-label", [], null, null, null, null, null)), b.Y(8, 16384, [[4, 4]], 0, T.a, [k.a, b.j, b.z, [8, null], [8, null], [8, null], [8, null]], null, null), (n()(),
            b._18(-1, null, ["Account"])), (n()(),
            b._18(-1, 2, ["\n          "])), (n()(),
            b.Z(11, 0, null, 3, 5, "ion-input", [["autocomplete", "on"], ["item-end", ""], ["text-right", ""]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngModelChange"], [null, "ionBlur"]], function(n, l, t) {
                var e = !0
                  , u = n.component;
                if ("ngModelChange" === l) {
                    e = !1 !== (u.fullName = t) && e
                }
                if ("ionBlur" === l) {
                    e = !1 !== u.changeFullName() && e
                }
                return e
            }, I.b, I.a)), b.Y(12, 671744, null, 0, x.q, [[8, null], [8, null], [8, null], [8, null]], {
                model: [0, "model"]
            }, {
                update: "ngModelChange"
            }), b._15(2048, null, x.m, null, [x.q]), b.Y(14, 16384, null, 0, x.n, [x.m], null, null), b.Y(15, 5423104, null, 0, j.a, [k.a, D.a, w.a, A.a, b.j, b.z, [2, Z.a], [2, C.a], [2, x.m], N.a], {
                autocomplete: [0, "autocomplete"]
            }, {
                ionBlur: "ionBlur"
            }), (n()(),
            b._18(-1, null, ["\n          "])), (n()(),
            b._18(-1, 2, ["\n        "]))], function(n, l) {
                n(l, 12, 0, l.component.fullName);
                n(l, 15, 0, "on")
            }, function(n, l) {
                n(l, 11, 0, b._13(l, 14).ngClassUntouched, b._13(l, 14).ngClassTouched, b._13(l, 14).ngClassPristine, b._13(l, 14).ngClassDirty, b._13(l, 14).ngClassValid, b._13(l, 14).ngClassInvalid, b._13(l, 14).ngClassPending)
            })
        }
        function i(n) {
            return b._19(0, [(n()(),
            b.Z(0, 0, null, null, 2, "button", [["ion-button", ""], ["item-end", ""], ["title", "Add another email address for notifications"]], null, [[null, "click"]], function(n, l, t) {
                var e = !0;
                if ("click" === l) {
                    e = !1 !== n.component.addEmail() && e
                }
                return e
            }, E.b, E.a)), b.Y(1, 1097728, [[11, 4]], 0, Y.a, [[8, ""], k.a, b.j, b.z], null, null), (n()(),
            b._18(-1, 0, ["\n            Add another email\n          "]))], null, null)
        }
        function o(n) {
            return b._19(0, [(n()(),
            b.Z(0, 0, null, null, 2, "button", [["ion-button", ""], ["item-end", ""], ["title", "Send notifications to additional email addresses"]], null, [[null, "click"]], function(n, l, t) {
                var e = !0;
                if ("click" === l) {
                    e = !1 !== n.component.addEmail() && e
                }
                return e
            }, E.b, E.a)), b.Y(1, 1097728, [[11, 4]], 0, Y.a, [[8, ""], k.a, b.j, b.z], null, null), (n()(),
            b._18(-1, 0, ["\n            Multiple emails\n          "]))], null, null)
        }
        function a(n) {
            return b._19(0, [(n()(),
            b.Z(0, 0, null, null, 22, "ion-item", [["class", "item item-block"]], null, null, null, y.b, y.a)), b.Y(1, 1097728, null, 3, C.a, [w.a, k.a, b.j, b.z, [2, P.a]], null, null), b._16(335544320, 16, {
                contentLabel: 0
            }), b._16(603979776, 17, {
                _buttons: 1
            }), b._16(603979776, 18, {
                _icons: 1
            }), b.Y(5, 16384, null, 0, S.a, [], null, null), (n()(),
            b._18(-1, 2, ["\n              "])), (n()(),
            b.Z(7, 0, null, 3, 7, "ion-input", [["autocomplete", "on"], ["item-end", ""], ["placeholder", "you@example.com"], ["text-right", ""], ["type", "email"]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngModelChange"], [null, "ionBlur"]], function(n, l, t) {
                var e = !0
                  , u = n.component;
                if ("ngModelChange" === l) {
                    e = !1 !== (n.context.$implicit.val = t) && e
                }
                if ("ionBlur" === l) {
                    e = !1 !== u.changeExtraEmails() && e
                }
                return e
            }, I.b, I.a)), b.Y(8, 278528, null, 0, O.g, [b.p, b.q, b.j, b.A], {
                ngClass: [0, "ngClass"]
            }, null), b._14(9, {
                "modeless-invalid": 0
            }), b.Y(10, 671744, null, 0, x.q, [[8, null], [8, null], [8, null], [8, null]], {
                model: [0, "model"]
            }, {
                update: "ngModelChange"
            }), b._15(2048, null, x.m, null, [x.q]), b.Y(12, 16384, null, 0, x.n, [x.m], null, null), b.Y(13, 5423104, null, 0, j.a, [k.a, D.a, w.a, A.a, b.j, b.z, [2, Z.a], [2, C.a], [2, x.m], N.a], {
                type: [0, "type"],
                autocomplete: [1, "autocomplete"],
                placeholder: [2, "placeholder"]
            }, {
                ionBlur: "ionBlur"
            }), (n()(),
            b._18(-1, null, ["\n              "])), (n()(),
            b._18(-1, 2, ["\n              "])), (n()(),
            b.Z(16, 0, null, 4, 5, "button", [["color", "danger"], ["ion-button", ""], ["item-end", ""], ["title", "Delete"]], null, [[null, "click"]], function(n, l, t) {
                var e = !0;
                if ("click" === l) {
                    e = !1 !== n.component.deleteExtraEmail(n.context.index) && e
                }
                return e
            }, E.b, E.a)), b.Y(17, 1097728, [[17, 4]], 0, Y.a, [[8, ""], k.a, b.j, b.z], {
                color: [0, "color"]
            }, null), (n()(),
            b._18(-1, 0, ["\n                "])), (n()(),
            b.Z(19, 0, null, 0, 1, "ion-icon", [["name", "trash"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), b.Y(20, 147456, null, 0, M.a, [k.a, b.j, b.z], {
                name: [0, "name"]
            }, null), (n()(),
            b._18(-1, 0, ["\n              "])), (n()(),
            b._18(-1, 2, ["\n            "]))], function(n, l) {
                var t = l.component;
                n(l, 8, 0, n(l, 9, 0, !t.blynk.isEmailValid(t.extraEmails[l.context.index].val) && "" != t.extraEmails[l.context.index].val));
                n(l, 10, 0, l.context.$implicit.val);
                n(l, 13, 0, "email", "on", "you@example.com");
                n(l, 17, 0, "danger");
                n(l, 20, 0, "trash")
            }, function(n, l) {
                n(l, 7, 0, b._13(l, 12).ngClassUntouched, b._13(l, 12).ngClassTouched, b._13(l, 12).ngClassPristine, b._13(l, 12).ngClassDirty, b._13(l, 12).ngClassValid, b._13(l, 12).ngClassInvalid, b._13(l, 12).ngClassPending);
                n(l, 19, 0, b._13(l, 20)._hidden)
            })
        }
        function r(n) {
            return b._19(0, [(n()(),
            b.Z(0, 0, null, null, 13, "ion-item", [["align-items-center", ""], ["class", "item item-block"]], [[24, "@rollInOut", 0]], null, null, y.b, y.a)), b.Y(1, 1097728, null, 3, C.a, [w.a, k.a, b.j, b.z, [2, P.a]], null, null), b._16(335544320, 13, {
                contentLabel: 0
            }), b._16(603979776, 14, {
                _buttons: 1
            }), b._16(603979776, 15, {
                _icons: 1
            }), b.Y(5, 16384, null, 0, S.a, [], null, null), (n()(),
            b._18(-1, 2, ["\n          "])), (n()(),
            b.Z(7, 0, null, 2, 5, "ion-list", [], null, null, null, null, null)), b.Y(8, 16384, null, 0, R.a, [k.a, b.j, b.z, D.a, z.l, N.a], null, null), (n()(),
            b._18(-1, null, ["\n            "])), (n()(),
            b.U(16777216, null, null, 1, null, a)), b.Y(11, 802816, null, 0, O.h, [b.I, b.F, b.p], {
                ngForOf: [0, "ngForOf"]
            }, null), (n()(),
            b._18(-1, null, ["\n          "])), (n()(),
            b._18(-1, 2, ["\n        "]))], function(n, l) {
                n(l, 11, 0, l.component.extraEmails)
            }, function(n, l) {
                n(l, 0, 0, void 0)
            })
        }
        function s(n) {
            return b._19(0, [(n()(),
            b.Z(0, 0, null, null, 24, "ion-item", [["align-items-center", ""], ["class", "item item-block"]], [[24, "@rollInOut", 0]], null, null, y.b, y.a)), b.Y(1, 1097728, null, 3, C.a, [w.a, k.a, b.j, b.z, [2, P.a]], null, null), b._16(335544320, 19, {
                contentLabel: 0
            }), b._16(603979776, 20, {
                _buttons: 1
            }), b._16(603979776, 21, {
                _icons: 1
            }), b.Y(5, 16384, null, 0, S.a, [], null, null), (n()(),
            b._18(-1, 2, ["\n          "])), (n()(),
            b.Z(7, 0, null, 1, 2, "ion-label", [], null, null, null, null, null)), b.Y(8, 16384, [[19, 4]], 0, T.a, [k.a, b.j, b.z, [8, null], [8, null], [8, null], [8, null]], null, null), (n()(),
            b._18(-1, null, ["Mobile number"])), (n()(),
            b._18(-1, 2, ["\n          "])), (n()(),
            b.Z(11, 0, null, 3, 12, "ion-input", [["autocomplete", "on"], ["item-end", ""], ["minlength", "12"], ["placeholder", "xxx-xxx-xxxx"], ["text-right", ""], ["type", "tel"]], [[1, "minlength", 0], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngModelChange"], [null, "ionBlur"], [null, "keyup"], [null, "ionFocus"]], function(n, l, t) {
                var e = !0
                  , u = n.component;
                if ("keyup" === l) {
                    e = !1 !== b._13(n, 16).inputKeyup(t) && e
                }
                if ("ionBlur" === l) {
                    e = !1 !== b._13(n, 16).inputOnblur(t) && e
                }
                if ("ionFocus" === l) {
                    e = !1 !== b._13(n, 16).inputFocus(t) && e
                }
                if ("ngModelChange" === l) {
                    e = !1 !== (u.mobileNumbers[0].val = t) && e
                }
                if ("ionBlur" === l) {
                    e = !1 !== u.changeMobileNumbers() && e
                }
                return e
            }, I.b, I.a)), b.Y(12, 278528, null, 0, O.g, [b.p, b.q, b.j, b.A], {
                ngClass: [0, "ngClass"]
            }, null), b._14(13, {
                "modeless-invalid": 0
            }), b.Y(14, 540672, null, 0, x.j, [], {
                minlength: [0, "minlength"]
            }, null), b._15(1024, null, x.k, function(n) {
                return [n]
            }, [x.j]), b.Y(16, 81920, null, 0, F.a, [b.z, b.j], {
                brmasker: [0, "brmasker"]
            }, null), b._14(17, {
                mask: 0,
                len: 1
            }), b._15(1024, null, x.l, function(n) {
                return [n]
            }, [F.a]), b.Y(19, 671744, null, 0, x.q, [[8, null], [2, x.k], [8, null], [2, x.l]], {
                model: [0, "model"]
            }, {
                update: "ngModelChange"
            }), b._15(2048, null, x.m, null, [x.q]), b.Y(21, 16384, null, 0, x.n, [x.m], null, null), b.Y(22, 5423104, null, 0, j.a, [k.a, D.a, w.a, A.a, b.j, b.z, [2, Z.a], [2, C.a], [2, x.m], N.a], {
                type: [0, "type"],
                autocomplete: [1, "autocomplete"],
                placeholder: [2, "placeholder"]
            }, {
                ionFocus: "ionFocus",
                ionBlur: "ionBlur"
            }), (n()(),
            b._18(-1, null, ["\n          "])), (n()(),
            b._18(-1, 2, ["\n        "]))], function(n, l) {
                var t = l.component;
                n(l, 12, 0, n(l, 13, 0, !t.blynk.isPhoneNumberValid(t.mobileNumbers[0].val) && "" != t.mobileNumbers[0].val));
                n(l, 14, 0, "12");
                n(l, 16, 0, n(l, 17, 0, "999-999-9999", 12));
                n(l, 19, 0, t.mobileNumbers[0].val);
                n(l, 22, 0, "tel", "on", "xxx-xxx-xxxx")
            }, function(n, l) {
                n(l, 0, 0, void 0);
                n(l, 11, 0, b._13(l, 14).minlength ? b._13(l, 14).minlength : null, b._13(l, 21).ngClassUntouched, b._13(l, 21).ngClassTouched, b._13(l, 21).ngClassPristine, b._13(l, 21).ngClassDirty, b._13(l, 21).ngClassValid, b._13(l, 21).ngClassInvalid, b._13(l, 21).ngClassPending)
            })
        }
        function c(n) {
            return b._19(0, [(n()(),
            b.Z(0, 0, null, null, 10, "ion-item", [["align-items-center", ""], ["class", "item item-block"]], null, null, null, y.b, y.a)), b.Y(1, 1097728, null, 3, C.a, [w.a, k.a, b.j, b.z, [2, P.a]], null, null), b._16(335544320, 22, {
                contentLabel: 0
            }), b._16(603979776, 23, {
                _buttons: 1
            }), b._16(603979776, 24, {
                _icons: 1
            }), b.Y(5, 16384, null, 0, S.a, [], null, null), (n()(),
            b._18(-1, 2, ["\n          "])), (n()(),
            b.Z(7, 0, null, 4, 2, "button", [["ion-button", ""], ["item-end", ""], ["title", "Send SMS to multiple mobile numbers"]], null, [[null, "click"]], function(n, l, t) {
                var e = !0;
                if ("click" === l) {
                    e = !1 !== n.component.addMobileNumber() && e
                }
                return e
            }, E.b, E.a)), b.Y(8, 1097728, [[23, 4]], 0, Y.a, [[8, ""], k.a, b.j, b.z], null, null), (n()(),
            b._18(-1, 0, ["\n            Multiple numbers\n          "])), (n()(),
            b._18(-1, 2, ["\n        "]))], null, null)
        }
        function d(n) {
            return b._19(0, [(n()(),
            b.Z(0, 0, null, null, 10, "ion-item", [["align-items-center", ""], ["class", "item item-block"]], null, null, null, y.b, y.a)), b.Y(1, 1097728, null, 3, C.a, [w.a, k.a, b.j, b.z, [2, P.a]], null, null), b._16(335544320, 25, {
                contentLabel: 0
            }), b._16(603979776, 26, {
                _buttons: 1
            }), b._16(603979776, 27, {
                _icons: 1
            }), b.Y(5, 16384, null, 0, S.a, [], null, null), (n()(),
            b._18(-1, 2, ["\n          Mobile numbers\n          "])), (n()(),
            b.Z(7, 0, null, 4, 2, "button", [["ion-button", ""], ["item-end", ""], ["title", "Add another mobile number for SMS notifications"]], null, [[null, "click"]], function(n, l, t) {
                var e = !0;
                if ("click" === l) {
                    e = !1 !== n.component.addMobileNumber() && e
                }
                return e
            }, E.b, E.a)), b.Y(8, 1097728, [[26, 4]], 0, Y.a, [[8, ""], k.a, b.j, b.z], null, null), (n()(),
            b._18(-1, 0, ["\n            Add another\n          "])), (n()(),
            b._18(-1, 2, ["\n        "]))], null, null)
        }
        function h(n) {
            return b._19(0, [(n()(),
            b.Z(0, 0, null, null, 27, "ion-item", [["class", "item item-block"]], null, null, null, y.b, y.a)), b.Y(1, 1097728, null, 3, C.a, [w.a, k.a, b.j, b.z, [2, P.a]], null, null), b._16(335544320, 31, {
                contentLabel: 0
            }), b._16(603979776, 32, {
                _buttons: 1
            }), b._16(603979776, 33, {
                _icons: 1
            }), b.Y(5, 16384, null, 0, S.a, [], null, null), (n()(),
            b._18(-1, 2, ["\n              "])), (n()(),
            b.Z(7, 0, null, 3, 12, "ion-input", [["autocomplete", "on"], ["item-end", ""], ["minlength", "12"], ["placeholder", "xxx-xxx-xxxx"], ["text-right", ""], ["type", "tel"]], [[1, "minlength", 0], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngModelChange"], [null, "ionBlur"], [null, "keyup"], [null, "ionFocus"]], function(n, l, t) {
                var e = !0
                  , u = n.component;
                if ("keyup" === l) {
                    e = !1 !== b._13(n, 12).inputKeyup(t) && e
                }
                if ("ionBlur" === l) {
                    e = !1 !== b._13(n, 12).inputOnblur(t) && e
                }
                if ("ionFocus" === l) {
                    e = !1 !== b._13(n, 12).inputFocus(t) && e
                }
                if ("ngModelChange" === l) {
                    e = !1 !== (n.context.$implicit.val = t) && e
                }
                if ("ionBlur" === l) {
                    e = !1 !== u.changeMobileNumbers() && e
                }
                return e
            }, I.b, I.a)), b.Y(8, 278528, null, 0, O.g, [b.p, b.q, b.j, b.A], {
                ngClass: [0, "ngClass"]
            }, null), b._14(9, {
                "modeless-invalid": 0
            }), b.Y(10, 540672, null, 0, x.j, [], {
                minlength: [0, "minlength"]
            }, null), b._15(1024, null, x.k, function(n) {
                return [n]
            }, [x.j]), b.Y(12, 81920, null, 0, F.a, [b.z, b.j], {
                brmasker: [0, "brmasker"]
            }, null), b._14(13, {
                mask: 0,
                len: 1
            }), b._15(1024, null, x.l, function(n) {
                return [n]
            }, [F.a]), b.Y(15, 671744, null, 0, x.q, [[8, null], [2, x.k], [8, null], [2, x.l]], {
                model: [0, "model"]
            }, {
                update: "ngModelChange"
            }), b._15(2048, null, x.m, null, [x.q]), b.Y(17, 16384, null, 0, x.n, [x.m], null, null), b.Y(18, 5423104, null, 0, j.a, [k.a, D.a, w.a, A.a, b.j, b.z, [2, Z.a], [2, C.a], [2, x.m], N.a], {
                type: [0, "type"],
                autocomplete: [1, "autocomplete"],
                placeholder: [2, "placeholder"]
            }, {
                ionFocus: "ionFocus",
                ionBlur: "ionBlur"
            }), (n()(),
            b._18(-1, null, ["\n              "])), (n()(),
            b._18(-1, 2, ["\n              "])), (n()(),
            b.Z(21, 0, null, 4, 5, "button", [["color", "danger"], ["ion-button", ""], ["item-end", ""], ["title", "Delete"]], null, [[null, "click"]], function(n, l, t) {
                var e = !0;
                if ("click" === l) {
                    e = !1 !== n.component.deleteMobileNumber(n.context.index) && e
                }
                return e
            }, E.b, E.a)), b.Y(22, 1097728, [[32, 4]], 0, Y.a, [[8, ""], k.a, b.j, b.z], {
                color: [0, "color"]
            }, null), (n()(),
            b._18(-1, 0, ["\n                "])), (n()(),
            b.Z(24, 0, null, 0, 1, "ion-icon", [["name", "trash"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), b.Y(25, 147456, null, 0, M.a, [k.a, b.j, b.z], {
                name: [0, "name"]
            }, null), (n()(),
            b._18(-1, 0, ["\n              "])), (n()(),
            b._18(-1, 2, ["\n            "]))], function(n, l) {
                n(l, 8, 0, n(l, 9, 0, !l.component.blynk.isPhoneNumberValid(l.context.$implicit.val) && "" != l.context.$implicit.val));
                n(l, 10, 0, "12");
                n(l, 12, 0, n(l, 13, 0, "999-999-9999", 12));
                n(l, 15, 0, l.context.$implicit.val);
                n(l, 18, 0, "tel", "on", "xxx-xxx-xxxx");
                n(l, 22, 0, "danger");
                n(l, 25, 0, "trash")
            }, function(n, l) {
                n(l, 7, 0, b._13(l, 10).minlength ? b._13(l, 10).minlength : null, b._13(l, 17).ngClassUntouched, b._13(l, 17).ngClassTouched, b._13(l, 17).ngClassPristine, b._13(l, 17).ngClassDirty, b._13(l, 17).ngClassValid, b._13(l, 17).ngClassInvalid, b._13(l, 17).ngClassPending);
                n(l, 24, 0, b._13(l, 25)._hidden)
            })
        }
        function p(n) {
            return b._19(0, [(n()(),
            b.Z(0, 0, null, null, 13, "ion-item", [["align-items-center", ""], ["class", "item item-block"]], [[24, "@rollInOut", 0]], null, null, y.b, y.a)), b.Y(1, 1097728, null, 3, C.a, [w.a, k.a, b.j, b.z, [2, P.a]], null, null), b._16(335544320, 28, {
                contentLabel: 0
            }), b._16(603979776, 29, {
                _buttons: 1
            }), b._16(603979776, 30, {
                _icons: 1
            }), b.Y(5, 16384, null, 0, S.a, [], null, null), (n()(),
            b._18(-1, 2, ["\n          "])), (n()(),
            b.Z(7, 0, null, 2, 5, "ion-list", [], null, null, null, null, null)), b.Y(8, 16384, null, 0, R.a, [k.a, b.j, b.z, D.a, z.l, N.a], null, null), (n()(),
            b._18(-1, null, ["\n            "])), (n()(),
            b.U(16777216, null, null, 1, null, h)), b.Y(11, 802816, null, 0, O.h, [b.I, b.F, b.p], {
                ngForOf: [0, "ngForOf"]
            }, null), (n()(),
            b._18(-1, null, ["\n          "])), (n()(),
            b._18(-1, 2, ["\n        "]))], function(n, l) {
                n(l, 11, 0, l.component.mobileNumbers)
            }, function(n, l) {
                n(l, 0, 0, void 0)
            })
        }
        function g(n) {
            return b._19(0, [(n()(),
            b.Z(0, 0, null, null, 18, "ion-item", [["align-items-center", ""], ["class", "item item-block"]], null, null, null, y.b, y.a)), b.Y(1, 1097728, null, 3, C.a, [w.a, k.a, b.j, b.z, [2, P.a]], null, null), b._16(335544320, 38, {
                contentLabel: 0
            }), b._16(603979776, 39, {
                _buttons: 1
            }), b._16(603979776, 40, {
                _icons: 1
            }), b.Y(5, 16384, null, 0, S.a, [], null, null), (n()(),
            b._18(-1, 2, ["\n            "])), (n()(),
            b.Z(7, 0, null, 1, 2, "ion-label", [], null, null, null, null, null)), b.Y(8, 16384, [[38, 4]], 0, T.a, [k.a, b.j, b.z, [8, null], [8, null], [8, null], [8, null]], null, null), (n()(),
            b._18(-1, null, ["Extend notification range"])), (n()(),
            b._18(-1, 2, ["\n            "])), (n()(),
            b.Z(11, 0, null, 4, 6, "ion-toggle", [["item-end", ""]], [[2, "toggle-disabled", null], [2, "toggle-checked", null], [2, "toggle-activated", null], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngModelChange"], [null, "keyup"]], function(n, l, t) {
                var e = !0
                  , u = n.component;
                if ("keyup" === l) {
                    e = !1 !== b._13(n, 12)._keyup(t) && e
                }
                if ("ngModelChange" === l) {
                    e = !1 !== (u.extendRange = t) && e
                }
                if ("ngModelChange" === l) {
                    e = !1 !== u.changeRange() && e
                }
                return e
            }, L.b, L.a)), b.Y(12, 1228800, null, 0, U.a, [w.a, k.a, D.a, b.j, b.z, H.a, [2, C.a], z.l, N.a, b.u], null, null), b._15(1024, null, x.l, function(n) {
                return [n]
            }, [U.a]), b.Y(14, 671744, null, 0, x.q, [[8, null], [8, null], [8, null], [2, x.l]], {
                model: [0, "model"]
            }, {
                update: "ngModelChange"
            }), b._15(2048, null, x.m, null, [x.q]), b.Y(16, 16384, null, 0, x.n, [x.m], null, null), (n()(),
            b._18(-1, null, ["\n            "])), (n()(),
            b._18(-1, 2, ["\n          "]))], function(n, l) {
                n(l, 14, 0, l.component.extendRange)
            }, function(n, l) {
                n(l, 11, 0, b._13(l, 12)._disabled, b._13(l, 12)._value, b._13(l, 12)._activated, b._13(l, 16).ngClassUntouched, b._13(l, 16).ngClassTouched, b._13(l, 16).ngClassPristine, b._13(l, 16).ngClassDirty, b._13(l, 16).ngClassValid, b._13(l, 16).ngClassInvalid, b._13(l, 16).ngClassPending)
            })
        }
        function f(n) {
            return b._19(0, [(n()(),
            b.Z(0, 0, null, null, 14, "ion-item", [["class", "item item-block"]], null, null, null, y.b, y.a)), b.Y(1, 1097728, null, 3, C.a, [w.a, k.a, b.j, b.z, [2, P.a]], null, null), b._16(335544320, 41, {
                contentLabel: 0
            }), b._16(603979776, 42, {
                _buttons: 1
            }), b._16(603979776, 43, {
                _icons: 1
            }), b.Y(5, 16384, null, 0, S.a, [], null, null), (n()(),
            b._18(-1, 2, ["\n            "])), (n()(),
            b.Z(7, 0, null, 1, 2, "ion-label", [], null, null, null, null, null)), b.Y(8, 16384, [[41, 4]], 0, T.a, [k.a, b.j, b.z, [8, null], [8, null], [8, null], [8, null]], null, null), (n()(),
            b._18(-1, null, ["Support"])), (n()(),
            b._18(-1, 2, ["\n            "])), (n()(),
            b.Z(11, 0, null, 4, 2, "button", [["ion-button", ""], ["item-end", ""]], null, [[null, "click"]], function(n, l, t) {
                var e = !0;
                if ("click" === l) {
                    e = !1 !== n.component.requestSupport() && e
                }
                return e
            }, E.b, E.a)), b.Y(12, 1097728, [[42, 4]], 0, Y.a, [[8, ""], k.a, b.j, b.z], null, null), (n()(),
            b._18(-1, 0, ["Request"])), (n()(),
            b._18(-1, 2, ["\n          "]))], null, null)
        }
        function _(n) {
            return b._19(0, [(n()(),
            b.Z(0, 0, null, null, 37, "form", [["novalidate", ""]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngSubmit"], [null, "submit"], [null, "reset"]], function(n, l, t) {
                var e = !0
                  , u = n.component;
                if ("submit" === l) {
                    e = !1 !== b._13(n, 2).onSubmit(t) && e
                }
                if ("reset" === l) {
                    e = !1 !== b._13(n, 2).onReset() && e
                }
                if ("ngSubmit" === l) {
                    e = !1 !== u.doMasquerade() && e
                }
                return e
            }, null, null)), b.Y(1, 16384, null, 0, x.A, [], null, null), b.Y(2, 4210688, [["masqueradeForm", 4]], 0, x.p, [[8, null], [8, null]], null, {
                ngSubmit: "ngSubmit"
            }), b._15(2048, null, x.d, null, [x.p]), b.Y(4, 16384, null, 0, x.o, [x.d], null, null), (n()(),
            b._18(-1, null, ["\n            "])), (n()(),
            b.Z(6, 0, null, null, 18, "ion-item", [["class", "item item-block"]], null, null, null, y.b, y.a)), b.Y(7, 1097728, null, 3, C.a, [w.a, k.a, b.j, b.z, [2, P.a]], null, null), b._16(335544320, 44, {
                contentLabel: 0
            }), b._16(603979776, 45, {
                _buttons: 1
            }), b._16(603979776, 46, {
                _icons: 1
            }), b.Y(11, 16384, null, 0, S.a, [], null, null), (n()(),
            b._18(-1, 2, ["\n              "])), (n()(),
            b.Z(13, 0, null, 1, 2, "ion-label", [], null, null, null, null, null)), b.Y(14, 16384, [[44, 4]], 0, T.a, [k.a, b.j, b.z, [8, null], [8, null], [8, null], [8, null]], null, null), (n()(),
            b._18(-1, null, ["Masquerade as"])), (n()(),
            b._18(-1, 2, ["\n              "])), (n()(),
            b.Z(17, 0, null, 3, 6, "ion-input", [["item-end", ""], ["name", "targetUser"], ["placeholder", "user email"], ["required", ""], ["text-right", ""], ["type", "email"]], [[1, "required", 0], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngModelChange"]], function(n, l, t) {
                var e = !0;
                if ("ngModelChange" === l) {
                    e = !1 !== (n.component.targetUser = t) && e
                }
                return e
            }, I.b, I.a)), b.Y(18, 16384, null, 0, x.u, [], {
                required: [0, "required"]
            }, null), b._15(1024, null, x.k, function(n) {
                return [n]
            }, [x.u]), b.Y(20, 671744, null, 0, x.q, [[2, x.d], [2, x.k], [8, null], [8, null]], {
                name: [0, "name"],
                model: [1, "model"]
            }, {
                update: "ngModelChange"
            }), b._15(2048, null, x.m, null, [x.q]), b.Y(22, 16384, null, 0, x.n, [x.m], null, null), b.Y(23, 5423104, [["target", 4]], 0, j.a, [k.a, D.a, w.a, A.a, b.j, b.z, [2, Z.a], [2, C.a], [2, x.m], N.a], {
                type: [0, "type"],
                placeholder: [1, "placeholder"]
            }, null), (n()(),
            b._18(-1, 2, ["\n            "])), (n()(),
            b._18(-1, null, ["\n            "])), (n()(),
            b.Z(26, 0, null, null, 10, "ion-item", [["class", "item item-block"]], null, null, null, y.b, y.a)), b.Y(27, 1097728, null, 3, C.a, [w.a, k.a, b.j, b.z, [2, P.a]], null, null), b._16(335544320, 47, {
                contentLabel: 0
            }), b._16(603979776, 48, {
                _buttons: 1
            }), b._16(603979776, 49, {
                _icons: 1
            }), b.Y(31, 16384, null, 0, S.a, [], null, null), (n()(),
            b._18(-1, 2, ["\n              "])), (n()(),
            b.Z(33, 0, null, 4, 2, "button", [["ion-button", ""], ["item-end", ""], ["type", "submit"]], [[8, "disabled", 0]], null, null, E.b, E.a)), b.Y(34, 1097728, [[48, 4]], 0, Y.a, [[8, ""], k.a, b.j, b.z], null, null), (n()(),
            b._18(-1, 0, ["Masquerade"])), (n()(),
            b._18(-1, 2, ["\n            "])), (n()(),
            b._18(-1, null, ["\n          "]))], function(n, l) {
                var t = l.component;
                n(l, 18, 0, "");
                n(l, 20, 0, "targetUser", t.targetUser);
                n(l, 23, 0, "email", "user email")
            }, function(n, l) {
                n(l, 0, 0, b._13(l, 4).ngClassUntouched, b._13(l, 4).ngClassTouched, b._13(l, 4).ngClassPristine, b._13(l, 4).ngClassDirty, b._13(l, 4).ngClassValid, b._13(l, 4).ngClassInvalid, b._13(l, 4).ngClassPending);
                n(l, 17, 0, b._13(l, 18).required ? "" : null, b._13(l, 22).ngClassUntouched, b._13(l, 22).ngClassTouched, b._13(l, 22).ngClassPristine, b._13(l, 22).ngClassDirty, b._13(l, 22).ngClassValid, b._13(l, 22).ngClassInvalid, b._13(l, 22).ngClassPending);
                n(l, 33, 0, !b._13(l, 2).form.valid)
            })
        }
        function m(n) {
            return b._19(0, [(n()(),
            b.Z(0, 0, null, null, 2, "button", [["block", ""], ["color", "light"], ["ion-button", ""]], null, [[null, "click"]], function(n, l, t) {
                var e = !0;
                if ("click" === l) {
                    e = !1 !== n.component.showDevPage() && e
                }
                return e
            }, E.b, E.a)), b.Y(1, 1097728, null, 0, Y.a, [[8, ""], k.a, b.j, b.z], {
                color: [0, "color"],
                block: [1, "block"]
            }, null), (n()(),
            b._18(-1, 0, ["Dev tools"]))], function(n, l) {
                n(l, 1, 0, "light", "")
            }, null)
        }
        function v(n) {
            return b._19(0, [(n()(),
            b.Z(0, 0, null, null, 120, "ion-content", [["padding", ""]], [[2, "statusbar-padding", null], [2, "has-refresher", null]], null, null, B.b, B.a)), b.Y(1, 4374528, null, 0, Z.a, [k.a, D.a, N.a, b.j, b.z, A.a, V.a, b.u, [2, q.a], [2, W.a]], null, null), (n()(),
            b._18(-1, 1, ["\n  "])), (n()(),
            b.Z(3, 0, null, 1, 116, "div", [], null, null, null, null, null)), (n()(),
            b._18(-1, null, ["\n      "])), (n()(),
            b.Z(5, 0, null, null, 113, "ion-list", [], null, null, null, null, null)), b.Y(6, 16384, null, 0, R.a, [k.a, b.j, b.z, D.a, z.l, N.a], null, null), (n()(),
            b._18(-1, null, ["\n\n    "])), (n()(),
            b.Z(8, 0, null, null, 109, "ion-grid", [["class", "grid"], ["style", "padding:0 1% 0 1%"]], null, null, null, null, null)), b.Y(9, 16384, null, 0, G.a, [], null, null), (n()(),
            b._18(-1, null, ["\n    "])), (n()(),
            b.Z(11, 0, null, null, 105, "ion-row", [["class", "row"]], null, null, null, null, null)), b.Y(12, 16384, null, 0, $.a, [], null, null), (n()(),
            b._18(-1, null, ["\n    "])), (n()(),
            b.Z(14, 0, null, null, 77, "ion-col", [["class", "col"], ["col-12", ""], ["col-md-6", ""], ["style", "padding:0"]], null, null, null, null, null)), b.Y(15, 16384, null, 0, K.a, [], null, null), (n()(),
            b._18(-1, null, [" \n\n        "])), (n()(),
            b.U(16777216, null, null, 1, null, e)), b.Y(18, 16384, null, 0, O.i, [b.I, b.F], {
                ngIf: [0, "ngIf"]
            }, null), (n()(),
            b._18(-1, null, ["\n\n        "])), (n()(),
            b.U(16777216, null, null, 1, null, u)), b.Y(21, 16384, null, 0, O.i, [b.I, b.F], {
                ngIf: [0, "ngIf"]
            }, null), (n()(),
            b._18(-1, null, ["\n\n        "])), (n()(),
            b.Z(23, 0, null, null, 9, "ion-item", [["class", "item item-block"]], null, null, null, y.b, y.a)), b.Y(24, 1097728, null, 3, C.a, [w.a, k.a, b.j, b.z, [2, P.a]], null, null), b._16(335544320, 7, {
                contentLabel: 0
            }), b._16(603979776, 8, {
                _buttons: 1
            }), b._16(603979776, 9, {
                _icons: 1
            }), b.Y(28, 16384, null, 0, S.a, [], null, null), (n()(),
            b._18(-1, 2, ["\n          Email address\n          "])), (n()(),
            b.Z(30, 0, null, 4, 1, "span", [["item-end", ""]], null, null, null, null, null)), (n()(),
            b._18(31, null, ["", ""])), (n()(),
            b._18(-1, 2, ["\n        "])), (n()(),
            b._18(-1, null, ["\n        "])), (n()(),
            b.Z(34, 0, null, null, 12, "ion-item", [["align-items-center", ""], ["class", "item item-block"]], null, null, null, y.b, y.a)), b.Y(35, 1097728, null, 3, C.a, [w.a, k.a, b.j, b.z, [2, P.a]], null, null), b._16(335544320, 10, {
                contentLabel: 0
            }), b._16(603979776, 11, {
                _buttons: 1
            }), b._16(603979776, 12, {
                _icons: 1
            }), b.Y(39, 16384, null, 0, S.a, [], null, null), (n()(),
            b._18(-1, 2, ["\n          "])), (n()(),
            b.U(16777216, null, 4, 1, null, i)), b.Y(42, 16384, null, 0, O.i, [b.I, b.F], {
                ngIf: [0, "ngIf"]
            }, null), (n()(),
            b._18(-1, 2, ["\n          "])), (n()(),
            b.U(16777216, null, 4, 1, null, o)), b.Y(45, 16384, null, 0, O.i, [b.I, b.F], {
                ngIf: [0, "ngIf"]
            }, null), (n()(),
            b._18(-1, 2, ["\n        "])), (n()(),
            b._18(-1, null, ["\n        "])), (n()(),
            b.U(16777216, null, null, 1, null, r)), b.Y(49, 16384, null, 0, O.i, [b.I, b.F], {
                ngIf: [0, "ngIf"]
            }, null), (n()(),
            b._18(-1, null, ["\n\n        "])), (n()(),
            b.U(16777216, null, null, 1, null, s)), b.Y(52, 16384, null, 0, O.i, [b.I, b.F], {
                ngIf: [0, "ngIf"]
            }, null), (n()(),
            b._18(-1, null, ["\n        "])), (n()(),
            b.U(16777216, null, null, 1, null, c)), b.Y(55, 16384, null, 0, O.i, [b.I, b.F], {
                ngIf: [0, "ngIf"]
            }, null), (n()(),
            b._18(-1, null, ["\n\n        "])), (n()(),
            b.U(16777216, null, null, 1, null, d)), b.Y(58, 16384, null, 0, O.i, [b.I, b.F], {
                ngIf: [0, "ngIf"]
            }, null), (n()(),
            b._18(-1, null, ["\n        "])), (n()(),
            b.U(16777216, null, null, 1, null, p)), b.Y(61, 16384, null, 0, O.i, [b.I, b.F], {
                ngIf: [0, "ngIf"]
            }, null), (n()(),
            b._18(-1, null, ["\n\n        "])), (n()(),
            b.Z(63, 0, null, null, 27, "ion-item", [["align-items-center", ""], ["class", "item item-block"], ["no-lines", ""]], null, null, null, y.b, y.a)), b.Y(64, 1097728, null, 3, C.a, [w.a, k.a, b.j, b.z, [2, P.a]], null, null), b._16(335544320, 34, {
                contentLabel: 0
            }), b._16(603979776, 35, {
                _buttons: 1
            }), b._16(603979776, 36, {
                _icons: 1
            }), b.Y(68, 16384, null, 0, S.a, [], null, null), (n()(),
            b._18(-1, 2, ["\n          "])), (n()(),
            b.Z(70, 0, null, 1, 2, "ion-label", [], null, null, null, null, null)), b.Y(71, 16384, [[34, 4]], 0, T.a, [k.a, b.j, b.z, [8, null], [8, null], [8, null], [8, null]], null, null), (n()(),
            b._18(-1, null, ["Temperature unit"])), (n()(),
            b._18(-1, 2, ["\n          "])), (n()(),
            b.Z(74, 0, null, 3, 15, "ion-select", [["interface", "popover"]], [[2, "select-disabled", null], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngModelChange"], [null, "ionChange"], [null, "click"], [null, "keyup.space"]], function(n, l, t) {
                var e = !0
                  , u = n.component;
                if ("click" === l) {
                    e = !1 !== b._13(n, 75)._click(t) && e
                }
                if ("keyup.space" === l) {
                    e = !1 !== b._13(n, 75)._keyup() && e
                }
                if ("ngModelChange" === l) {
                    e = !1 !== (u.celsiusMode = t) && e
                }
                if ("ionChange" === l) {
                    e = !1 !== u.toggleCelsius() && e
                }
                return e
            }, J.b, J.a)), b.Y(75, 1228800, null, 1, X.a, [A.a, w.a, k.a, b.j, b.z, [2, C.a], Q.a], {
                interface: [0, "interface"]
            }, {
                ionChange: "ionChange"
            }), b._16(603979776, 37, {
                options: 1
            }), b._15(1024, null, x.l, function(n) {
                return [n]
            }, [X.a]), b.Y(78, 671744, null, 0, x.q, [[8, null], [8, null], [8, null], [2, x.l]], {
                model: [0, "model"]
            }, {
                update: "ngModelChange"
            }), b._15(2048, null, x.m, null, [x.q]), b.Y(80, 16384, null, 0, x.n, [x.m], null, null), (n()(),
            b._18(-1, null, ["\n            "])), (n()(),
            b.Z(82, 0, null, null, 2, "ion-option", [["value", "0"]], null, null, null, null, null)), b.Y(83, 16384, [[37, 4]], 0, nn.a, [b.j], {
                value: [0, "value"]
            }, null), (n()(),
            b._18(-1, null, ["Fahrenheit"])), (n()(),
            b._18(-1, null, ["\n            "])), (n()(),
            b.Z(86, 0, null, null, 2, "ion-option", [["value", "1"]], null, null, null, null, null)), b.Y(87, 16384, [[37, 4]], 0, nn.a, [b.j], {
                value: [0, "value"]
            }, null), (n()(),
            b._18(-1, null, ["Celsius"])), (n()(),
            b._18(-1, null, ["\n          "])), (n()(),
            b._18(-1, 2, ["\n        "])), (n()(),
            b._18(-1, null, ["\n\n    "])), (n()(),
            b._18(-1, null, ["\n\n    "])), (n()(),
            b.Z(93, 0, null, null, 22, "ion-col", [["class", "col"], ["col-12", ""], ["col-md-6", ""], ["style", "padding:0 1% 0 1%"]], null, null, null, null, null)), b.Y(94, 16384, null, 0, K.a, [], null, null), (n()(),
            b._18(-1, null, ["\n\n       "])), (n()(),
            b.Z(96, 0, null, null, 11, "expanding-list-item", [["icon", "build"], ["item_title", "Diagnostics"]], null, null, null, ln.b, ln.a)), b.Y(97, 49152, null, 0, tn.a, [], {
                item_title: [0, "item_title"],
                show: [1, "show"],
                icon: [2, "icon"]
            }, null), (n()(),
            b._18(-1, 0, ["\n\n          "])), (n()(),
            b.U(16777216, null, 0, 1, null, g)), b.Y(100, 16384, null, 0, O.i, [b.I, b.F], {
                ngIf: [0, "ngIf"]
            }, null), (n()(),
            b._18(-1, 0, ["\n\n          "])), (n()(),
            b.U(16777216, null, 0, 1, null, f)), b.Y(103, 16384, null, 0, O.i, [b.I, b.F], {
                ngIf: [0, "ngIf"]
            }, null), (n()(),
            b._18(-1, 0, ["\n\n          "])), (n()(),
            b.U(16777216, null, 0, 1, null, _)), b.Y(106, 16384, null, 0, O.i, [b.I, b.F], {
                ngIf: [0, "ngIf"]
            }, null), (n()(),
            b._18(-1, 0, ["\n\n        "])), (n()(),
            b._18(-1, null, ["\n\n        "])), (n()(),
            b.Z(109, 0, null, null, 2, "button", [["block", ""], ["color", "light"], ["ion-button", ""]], null, [[null, "click"]], function(n, l, t) {
                var e = !0;
                if ("click" === l) {
                    e = !1 !== n.component.logout() && e
                }
                return e
            }, E.b, E.a)), b.Y(110, 1097728, null, 0, Y.a, [[8, ""], k.a, b.j, b.z], {
                color: [0, "color"],
                block: [1, "block"]
            }, null), (n()(),
            b._18(-1, 0, ["Log out"])), (n()(),
            b._18(-1, null, ["\n        "])), (n()(),
            b.U(16777216, null, null, 1, null, m)), b.Y(114, 16384, null, 0, O.i, [b.I, b.F], {
                ngIf: [0, "ngIf"]
            }, null), (n()(),
            b._18(-1, null, ["\n\n    "])), (n()(),
            b._18(-1, null, ["         \n    "])), (n()(),
            b._18(-1, null, ["\n    "])), (n()(),
            b._18(-1, null, ["\n    "])), (n()(),
            b._18(-1, null, ["\n  "])), (n()(),
            b._18(-1, 1, ["\n"])), (n()(),
            b._18(-1, null, ["\n"]))], function(n, l) {
                var t = l.component;
                n(l, 18, 0, t.masquerade.masquerading);
                n(l, 21, 0, t.fullName);
                n(l, 42, 0, t.extraEmails.length >= 1);
                n(l, 45, 0, 0 == t.extraEmails.length);
                n(l, 49, 0, t.extraEmails.length >= 1);
                n(l, 52, 0, t.mobileNumbers.length <= 1);
                n(l, 55, 0, t.mobileNumbers.length <= 1);
                n(l, 58, 0, t.mobileNumbers.length > 1);
                n(l, 61, 0, t.mobileNumbers.length > 1);
                n(l, 75, 0, "popover");
                n(l, 78, 0, t.celsiusMode);
                n(l, 83, 0, "0");
                n(l, 87, 0, "1");
                n(l, 97, 0, "Diagnostics", t.masquerade.canMasquerade, "build");
                n(l, 100, 0, t.showDev);
                n(l, 103, 0, !t.masquerade.canMasquerade);
                n(l, 106, 0, t.masquerade.canMasquerade && !t.masquerade.masquerading);
                n(l, 110, 0, "light", "");
                n(l, 114, 0, t.showDev)
            }, function(n, l) {
                var t = l.component;
                n(l, 0, 0, b._13(l, 1).statusbarPadding, b._13(l, 1)._hasRefresher);
                n(l, 31, 0, t.accountName);
                n(l, 74, 0, b._13(l, 75)._disabled, b._13(l, 80).ngClassUntouched, b._13(l, 80).ngClassTouched, b._13(l, 80).ngClassPristine, b._13(l, 80).ngClassDirty, b._13(l, 80).ngClassValid, b._13(l, 80).ngClassInvalid, b._13(l, 80).ngClassPending)
            })
        }
        t.d(l, "a", function() {
            return gn
        });
        var b = t(0)
          , y = t(38)
          , C = t(18)
          , w = t(17)
          , k = t(2)
          , P = t(28)
          , S = t(33)
          , T = t(41)
          , E = t(20)
          , Y = t(14)
          , I = t(75)
          , x = t(16)
          , j = t(49)
          , D = t(5)
          , A = t(8)
          , Z = t(23)
          , N = t(7)
          , O = t(10)
          , M = t(27)
          , R = t(30)
          , z = t(9)
          , F = t(152)
          , L = t(406)
          , U = t(103)
          , H = t(40)
          , B = t(72)
          , V = t(26)
          , q = t(6)
          , W = t(21)
          , G = t(58)
          , $ = t(43)
          , K = t(42)
          , J = t(106)
          , X = t(61)
          , Q = t(22)
          , nn = t(60)
          , ln = t(405)
          , tn = t(145)
          , en = t(114)
          , un = t(19)
          , on = t(102)
          , an = t(36)
          , rn = t(15)
          , sn = t(32)
          , cn = t(37)
          , dn = t(52)
          , hn = t(63)
          , pn = b.X({
            encapsulation: 2,
            styles: [],
            data: {
                animation: [{
                    type: 7,
                    name: "rollInOut",
                    definitions: [{
                        type: 1,
                        expr: ":enter",
                        animation: [{
                            type: 6,
                            styles: {
                                height: 0,
                                overflow: "hidden"
                            },
                            offset: null
                        }, {
                            type: 4,
                            styles: {
                                type: 6,
                                styles: {
                                    height: "*"
                                },
                                offset: null
                            },
                            timings: "300ms ease-out"
                        }],
                        options: null
                    }, {
                        type: 1,
                        expr: ":leave",
                        animation: [{
                            type: 4,
                            styles: {
                                type: 6,
                                styles: {
                                    height: 0,
                                    overflow: "hidden"
                                },
                                offset: null
                            },
                            timings: "300ms ease-out"
                        }],
                        options: null
                    }],
                    options: {}
                }]
            }
        })
          , gn = b.V("page-profile", en.a, function(n) {
            return b._19(0, [(n()(),
            b.Z(0, 0, null, null, 1, "page-profile", [], null, null, null, v, pn)), b.Y(1, 4243456, null, 0, en.a, [W.a, un.a, on.a, an.a, rn.a, sn.a, cn.a, dn.a, hn.a], null, null)], null, null)
        }, {}, {}, [])
    },
    428: function(n, l, t) {
        "use strict";
        function e(n) {
            return i._19(0, [(n()(),
            i.Z(0, 0, null, null, 1, "p", [["color", "danger"]], null, null, null, null, null)), (n()(),
            i._18(-1, null, ["\n                Password and confirmation must match.\n              "]))], null, null)
        }
        function u(n) {
            return i._19(0, [i._16(402653184, 1, {
                passwordBox: 0
            }), i._16(402653184, 2, {
                passwordToggle: 0
            }), i._16(402653184, 3, {
                confirmPasswordBox: 0
            }), i._16(402653184, 4, {
                confirmPasswordToggle: 0
            }), i._16(402653184, 5, {
                emailBox: 0
            }), (n()(),
            i.Z(5, 0, null, null, 98, "single-page", [["page_title", "Register"]], null, null, null, o.b, o.a)), i.Y(6, 49152, null, 0, a.a, [], {
                page_title: [0, "page_title"]
            }, null), (n()(),
            i._18(-1, 0, ["\n  "])), (n()(),
            i.Z(8, 0, null, 0, 94, "div", [["class", "login-box"]], null, null, null, null, null)), (n()(),
            i._18(-1, null, ["\n   "])), (n()(),
            i.Z(10, 0, null, null, 91, "form", [["novalidate", ""]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngSubmit"], [null, "submit"], [null, "reset"]], function(n, l, t) {
                var e = !0
                  , u = n.component;
                if ("submit" === l) {
                    e = !1 !== i._13(n, 12).onSubmit(t) && e
                }
                if ("reset" === l) {
                    e = !1 !== i._13(n, 12).onReset() && e
                }
                if ("ngSubmit" === l) {
                    e = !1 !== u.register() && e
                }
                return e
            }, null, null)), i.Y(11, 16384, null, 0, r.A, [], null, null), i.Y(12, 4210688, [["registerForm", 4]], 0, r.p, [[8, null], [8, null]], null, {
                ngSubmit: "ngSubmit"
            }), i._15(2048, null, r.d, null, [r.p]), i.Y(14, 16384, null, 0, r.o, [r.d], null, null), (n()(),
            i._18(-1, null, ["\n      "])), (n()(),
            i.Z(16, 0, null, null, 72, "ion-row", [["class", "row"]], null, null, null, null, null)), i.Y(17, 16384, null, 0, s.a, [], null, null), (n()(),
            i._18(-1, null, ["\n        "])), (n()(),
            i.Z(19, 0, null, null, 68, "ion-col", [["class", "col"]], null, null, null, null, null)), i.Y(20, 16384, null, 0, c.a, [], null, null), (n()(),
            i._18(-1, null, ["\n          "])), (n()(),
            i.Z(22, 0, null, null, 64, "ion-list", [["inset", ""]], null, null, null, null, null)), i.Y(23, 16384, null, 0, d.a, [h.a, i.j, i.z, p.a, g.l, f.a], null, null), (n()(),
            i._18(-1, null, ["\n\n            "])), (n()(),
            i.Z(25, 0, null, null, 14, "ion-item", [["class", "item item-block"]], null, null, null, _.b, _.a)), i.Y(26, 1097728, null, 3, m.a, [v.a, h.a, i.j, i.z, [2, b.a]], null, null), i._16(335544320, 6, {
                contentLabel: 0
            }), i._16(603979776, 7, {
                _buttons: 1
            }), i._16(603979776, 8, {
                _icons: 1
            }), i.Y(30, 16384, null, 0, y.a, [], null, null), (n()(),
            i._18(-1, 2, ["\n              "])), (n()(),
            i.Z(32, 0, null, 3, 6, "ion-input", [["name", "email"], ["placeholder", "Email"], ["required", ""], ["type", "email"]], [[1, "required", 0], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngModelChange"]], function(n, l, t) {
                var e = !0;
                if ("ngModelChange" === l) {
                    e = !1 !== (n.component.registerCredentials.email = t) && e
                }
                return e
            }, C.b, C.a)), i.Y(33, 16384, null, 0, r.u, [], {
                required: [0, "required"]
            }, null), i._15(1024, null, r.k, function(n) {
                return [n]
            }, [r.u]), i.Y(35, 671744, null, 0, r.q, [[2, r.d], [2, r.k], [8, null], [8, null]], {
                name: [0, "name"],
                model: [1, "model"]
            }, {
                update: "ngModelChange"
            }), i._15(2048, null, r.m, null, [r.q]), i.Y(37, 16384, null, 0, r.n, [r.m], null, null), i.Y(38, 5423104, [[5, 4], ["email", 4]], 0, w.a, [h.a, p.a, v.a, k.a, i.j, i.z, [2, P.a], [2, m.a], [2, r.m], f.a], {
                type: [0, "type"],
                placeholder: [1, "placeholder"]
            }, null), (n()(),
            i._18(-1, 2, ["\n            "])), (n()(),
            i._18(-1, null, ["\n\n            "])), (n()(),
            i.Z(41, 0, null, null, 17, "ion-item", [["class", "item item-block"]], null, null, null, _.b, _.a)), i.Y(42, 1097728, null, 3, m.a, [v.a, h.a, i.j, i.z, [2, b.a]], null, null), i._16(335544320, 9, {
                contentLabel: 0
            }), i._16(603979776, 10, {
                _buttons: 1
            }), i._16(603979776, 11, {
                _icons: 1
            }), i.Y(46, 16384, null, 0, y.a, [], null, null), (n()(),
            i._18(-1, 2, ["\n              "])), (n()(),
            i.Z(48, 0, null, 3, 6, "ion-input", [["id", "password"], ["name", "password"], ["placeholder", "Password"], ["required", ""]], [[1, "required", 0], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngModelChange"]], function(n, l, t) {
                var e = !0;
                if ("ngModelChange" === l) {
                    e = !1 !== (n.component.registerCredentials.password = t) && e
                }
                return e
            }, C.b, C.a)), i.Y(49, 16384, null, 0, r.u, [], {
                required: [0, "required"]
            }, null), i._15(1024, null, r.k, function(n) {
                return [n]
            }, [r.u]), i.Y(51, 671744, null, 0, r.q, [[2, r.d], [2, r.k], [8, null], [8, null]], {
                name: [0, "name"],
                model: [1, "model"]
            }, {
                update: "ngModelChange"
            }), i._15(2048, null, r.m, null, [r.q]), i.Y(53, 16384, null, 0, r.n, [r.m], null, null), i.Y(54, 5423104, [[1, 4], ["password", 4]], 0, w.a, [h.a, p.a, v.a, k.a, i.j, i.z, [2, P.a], [2, m.a], [2, r.m], f.a], {
                type: [0, "type"],
                placeholder: [1, "placeholder"]
            }, null), (n()(),
            i._18(-1, 2, ["\n              "])), (n()(),
            i.Z(56, 0, null, 4, 1, "password-toggle", [["item-end", ""]], null, null, null, S.b, S.a)), i.Y(57, 49152, [[2, 4], ["passwordToggle", 4]], 0, T.a, [], null, null), (n()(),
            i._18(-1, 2, ["\n            "])), (n()(),
            i._18(-1, null, ["\n\n            "])), (n()(),
            i.Z(60, 0, null, null, 14, "ion-item", [["class", "item item-block"]], null, null, null, _.b, _.a)), i.Y(61, 1097728, null, 3, m.a, [v.a, h.a, i.j, i.z, [2, b.a]], null, null), i._16(335544320, 12, {
                contentLabel: 0
            }), i._16(603979776, 13, {
                _buttons: 1
            }), i._16(603979776, 14, {
                _icons: 1
            }), i.Y(65, 16384, null, 0, y.a, [], null, null), (n()(),
            i._18(-1, 2, ["\n              "])), (n()(),
            i.Z(67, 0, null, 3, 6, "ion-input", [["id", "confirm_password"], ["name", "confirm_password"], ["placeholder", "Confirm Password"], ["required", ""]], [[1, "required", 0], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngModelChange"]], function(n, l, t) {
                var e = !0;
                if ("ngModelChange" === l) {
                    e = !1 !== (n.component.registerCredentials.confirm_password = t) && e
                }
                return e
            }, C.b, C.a)), i.Y(68, 16384, null, 0, r.u, [], {
                required: [0, "required"]
            }, null), i._15(1024, null, r.k, function(n) {
                return [n]
            }, [r.u]), i.Y(70, 671744, null, 0, r.q, [[2, r.d], [2, r.k], [8, null], [8, null]], {
                name: [0, "name"],
                model: [1, "model"]
            }, {
                update: "ngModelChange"
            }), i._15(2048, null, r.m, null, [r.q]), i.Y(72, 16384, null, 0, r.n, [r.m], null, null), i.Y(73, 5423104, [[1, 4], ["password", 4]], 0, w.a, [h.a, p.a, v.a, k.a, i.j, i.z, [2, P.a], [2, m.a], [2, r.m], f.a], {
                type: [0, "type"],
                placeholder: [1, "placeholder"]
            }, null), (n()(),
            i._18(-1, 2, ["\n            "])), (n()(),
            i._18(-1, null, ["\n\n            "])), (n()(),
            i.Z(76, 0, null, null, 9, "ion-item", [["class", "item item-block"]], null, null, null, _.b, _.a)), i.Y(77, 1097728, null, 3, m.a, [v.a, h.a, i.j, i.z, [2, b.a]], null, null), i._16(335544320, 15, {
                contentLabel: 0
            }), i._16(603979776, 16, {
                _buttons: 1
            }), i._16(603979776, 17, {
                _icons: 1
            }), i.Y(81, 16384, null, 0, y.a, [], null, null), (n()(),
            i._18(-1, 2, ["\n              "])), (n()(),
            i.U(16777216, null, 2, 1, null, e)), i.Y(84, 16384, null, 0, E.i, [i.I, i.F], {
                ngIf: [0, "ngIf"]
            }, null), (n()(),
            i._18(-1, 2, ["\n            "])), (n()(),
            i._18(-1, null, ["\n\n          "])), (n()(),
            i._18(-1, null, ["\n        "])), (n()(),
            i._18(-1, null, ["\n      "])), (n()(),
            i._18(-1, null, ["\n\n      "])), (n()(),
            i.Z(90, 0, null, null, 10, "ion-row", [["class", "row"]], null, null, null, null, null)), i.Y(91, 16384, null, 0, s.a, [], null, null), (n()(),
            i._18(-1, null, ["\n        "])), (n()(),
            i.Z(93, 0, null, null, 6, "ion-col", [["class", "signup-col col"]], null, null, null, null, null)), i.Y(94, 16384, null, 0, c.a, [], null, null), (n()(),
            i._18(-1, null, ["\n          "])), (n()(),
            i.Z(96, 0, null, null, 2, "button", [["full", ""], ["ion-button", ""], ["type", "submit"]], [[8, "disabled", 0]], null, null, Y.b, Y.a)), i.Y(97, 1097728, null, 0, I.a, [[8, ""], h.a, i.j, i.z], {
                full: [0, "full"]
            }, null), (n()(),
            i._18(-1, 0, ["Create New Account"])), (n()(),
            i._18(-1, null, ["\n        "])), (n()(),
            i._18(-1, null, ["\n      "])), (n()(),
            i._18(-1, null, ["\n    "])), (n()(),
            i._18(-1, null, ["\n  "])), (n()(),
            i._18(-1, 0, ["\n"]))], function(n, l) {
                var t = l.component;
                n(l, 6, 0, "Register");
                n(l, 33, 0, "");
                n(l, 35, 0, "email", t.registerCredentials.email);
                n(l, 38, 0, "email", "Email");
                n(l, 49, 0, "");
                n(l, 51, 0, "password", t.registerCredentials.password);
                n(l, 54, 0, i._13(l, 57).inputType, "Password");
                n(l, 68, 0, "");
                n(l, 70, 0, "confirm_password", t.registerCredentials.confirm_password);
                n(l, 73, 0, i._13(l, 57).inputType, "Confirm Password");
                n(l, 84, 0, t.registerCredentials.password != t.registerCredentials.confirm_password);
                n(l, 97, 0, "")
            }, function(n, l) {
                var t = l.component;
                n(l, 10, 0, i._13(l, 14).ngClassUntouched, i._13(l, 14).ngClassTouched, i._13(l, 14).ngClassPristine, i._13(l, 14).ngClassDirty, i._13(l, 14).ngClassValid, i._13(l, 14).ngClassInvalid, i._13(l, 14).ngClassPending);
                n(l, 32, 0, i._13(l, 33).required ? "" : null, i._13(l, 37).ngClassUntouched, i._13(l, 37).ngClassTouched, i._13(l, 37).ngClassPristine, i._13(l, 37).ngClassDirty, i._13(l, 37).ngClassValid, i._13(l, 37).ngClassInvalid, i._13(l, 37).ngClassPending);
                n(l, 48, 0, i._13(l, 49).required ? "" : null, i._13(l, 53).ngClassUntouched, i._13(l, 53).ngClassTouched, i._13(l, 53).ngClassPristine, i._13(l, 53).ngClassDirty, i._13(l, 53).ngClassValid, i._13(l, 53).ngClassInvalid, i._13(l, 53).ngClassPending);
                n(l, 67, 0, i._13(l, 68).required ? "" : null, i._13(l, 72).ngClassUntouched, i._13(l, 72).ngClassTouched, i._13(l, 72).ngClassPristine, i._13(l, 72).ngClassDirty, i._13(l, 72).ngClassValid, i._13(l, 72).ngClassInvalid, i._13(l, 72).ngClassPending);
                n(l, 96, 0, !i._13(l, 12).form.valid || t.registerCredentials.password != t.registerCredentials.confirm_password)
            })
        }
        t.d(l, "a", function() {
            return F
        });
        var i = t(0)
          , o = t(151)
          , a = t(87)
          , r = t(16)
          , s = t(43)
          , c = t(42)
          , d = t(30)
          , h = t(2)
          , p = t(5)
          , g = t(9)
          , f = t(7)
          , _ = t(38)
          , m = t(18)
          , v = t(17)
          , b = t(28)
          , y = t(33)
          , C = t(75)
          , w = t(49)
          , k = t(8)
          , P = t(23)
          , S = t(407)
          , T = t(146)
          , E = t(10)
          , Y = t(20)
          , I = t(14)
          , x = t(116)
          , j = t(21)
          , D = t(19)
          , A = t(34)
          , Z = t(63)
          , N = t(98)
          , O = t(15)
          , M = t(32)
          , R = t(37)
          , z = i.X({
            encapsulation: 2,
            styles: [],
            data: {}
        })
          , F = i.V("page-register", x.a, function(n) {
            return i._19(0, [(n()(),
            i.Z(0, 0, null, null, 1, "page-register", [], null, null, null, u, z)), i.Y(1, 4243456, null, 0, x.a, [j.a, D.a, A.a, Z.a, N.a, O.a, M.a, R.a], null, null)], null, null)
        }, {}, {}, [])
    },
    429: function(n, l, t) {
        "use strict";
        function e(n) {
            return u._19(0, [(n()(),
            u.Z(0, 0, null, null, 81, "ion-list", [["padding-horizontal", ""]], null, null, null, null, null)), u.Y(1, 16384, null, 0, i.a, [o.a, u.j, u.z, a.a, r.l, s.a], null, null), (n()(),
            u._18(-1, null, ["\n  "])), (n()(),
            u.Z(3, 0, null, null, 1, "h2", [], null, null, null, null, null)), (n()(),
            u._18(-1, null, ["Resetting WiFi"])), (n()(),
            u._18(-1, null, ["\n  "])), (n()(),
            u.Z(6, 0, null, null, 1, "p", [], null, null, null, null, null)), (n()(),
            u._18(-1, null, ["To reset a CoolBot's network settings, from its default display mode: "])), (n()(),
            u._18(-1, null, ["\n  "])), (n()(),
            u.Z(9, 0, null, null, 55, "ol", [], null, null, null, null, null)), (n()(),
            u._18(-1, null, ["\n    "])), (n()(),
            u.Z(11, 0, null, null, 7, "li", [], null, null, null, null, null)), (n()(),
            u._18(-1, null, ["Press "])), (n()(),
            u.Z(13, 0, null, null, 1, "ion-icon", [["alt", "Left"], ["name", "arrow-dropleft-circle"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), u.Y(14, 147456, null, 0, c.a, [o.a, u.j, u.z], {
                name: [0, "name"]
            }, null), (n()(),
            u._18(-1, null, [".  The "])), (n()(),
            u.Z(16, 0, null, null, 1, "b", [], null, null, null, null, null)), (n()(),
            u._18(-1, null, ["Program"])), (n()(),
            u._18(-1, null, [" mode light lights, and the firmware version number shows on the display."])), (n()(),
            u._18(-1, null, ["\n    "])), (n()(),
            u.Z(20, 0, null, null, 10, "li", [], null, null, null, null, null)), (n()(),
            u._18(-1, null, ["Press "])), (n()(),
            u.Z(22, 0, null, null, 1, "ion-icon", [["alt", "Check"], ["name", "checkmark-circle"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), u.Y(23, 147456, null, 0, c.a, [o.a, u.j, u.z], {
                name: [0, "name"]
            }, null), (n()(),
            u._18(-1, null, [" five times.  The "])), (n()(),
            u.Z(25, 0, null, null, 1, "b", [], null, null, null, null, null)), (n()(),
            u._18(-1, null, ["Program"])), (n()(),
            u._18(-1, null, [" mode light blinks, and "])), (n()(),
            u.Z(28, 0, null, null, 1, "b", [], null, null, null, null, null)), (n()(),
            u._18(-1, null, ["P1"])), (n()(),
            u._18(-1, null, [" flashes on the display."])), (n()(),
            u._18(-1, null, ["\n    "])), (n()(),
            u.Z(32, 0, null, null, 7, "li", [], null, null, null, null, null)), (n()(),
            u._18(-1, null, ["Press "])), (n()(),
            u.Z(34, 0, null, null, 1, "ion-icon", [["alt", "Left"], ["name", "arrow-dropleft-circle"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), u.Y(35, 147456, null, 0, c.a, [o.a, u.j, u.z], {
                name: [0, "name"]
            }, null), (n()(),
            u._18(-1, null, [" twice.  "])), (n()(),
            u.Z(37, 0, null, null, 1, "b", [], null, null, null, null, null)), (n()(),
            u._18(-1, null, ["CJ"])), (n()(),
            u._18(-1, null, [" flashes on the display, for Clear Jumper settings."])), (n()(),
            u._18(-1, null, ["\n    "])), (n()(),
            u.Z(41, 0, null, null, 7, "li", [], null, null, null, null, null)), (n()(),
            u._18(-1, null, ["Press "])), (n()(),
            u.Z(43, 0, null, null, 1, "ion-icon", [["alt", "Check"], ["name", "checkmark-circle"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), u.Y(44, 147456, null, 0, c.a, [o.a, u.j, u.z], {
                name: [0, "name"]
            }, null), (n()(),
            u._18(-1, null, [".  "])), (n()(),
            u.Z(46, 0, null, null, 1, "b", [], null, null, null, null, null)), (n()(),
            u._18(-1, null, ["n"])), (n()(),
            u._18(-1, null, [" flashes on the display."])), (n()(),
            u._18(-1, null, ["\n    "])), (n()(),
            u.Z(50, 0, null, null, 7, "li", [], null, null, null, null, null)), (n()(),
            u._18(-1, null, ["Press "])), (n()(),
            u.Z(52, 0, null, null, 1, "ion-icon", [["alt", "Left"], ["name", "arrow-dropleft-circle"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), u.Y(53, 147456, null, 0, c.a, [o.a, u.j, u.z], {
                name: [0, "name"]
            }, null), (n()(),
            u._18(-1, null, [".  "])), (n()(),
            u.Z(55, 0, null, null, 1, "b", [], null, null, null, null, null)), (n()(),
            u._18(-1, null, ["y"])), (n()(),
            u._18(-1, null, [" flashes on the display, to confirm."])), (n()(),
            u._18(-1, null, ["\n    "])), (n()(),
            u.Z(59, 0, null, null, 4, "li", [], null, null, null, null, null)), (n()(),
            u._18(-1, null, ["Press "])), (n()(),
            u.Z(61, 0, null, null, 1, "ion-icon", [["alt", "Check"], ["name", "checkmark-circle"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), u.Y(62, 147456, null, 0, c.a, [o.a, u.j, u.z], {
                name: [0, "name"]
            }, null), (n()(),
            u._18(-1, null, [" to confirm."])), (n()(),
            u._18(-1, null, ["\n  "])), (n()(),
            u._18(-1, null, ["\n  "])), (n()(),
            u.Z(66, 0, null, null, 10, "p", [], null, null, null, null, null)), (n()(),
            u._18(-1, null, ["The CoolBot should return to its normal display mode, but now showing "])), (n()(),
            u.Z(68, 0, null, null, 1, "b", [], null, null, null, null, null)), (n()(),
            u._18(-1, null, ["E0"])), (n()(),
            u._18(-1, null, [", "])), (n()(),
            u.Z(71, 0, null, null, 1, "b", [], null, null, null, null, null)), (n()(),
            u._18(-1, null, ["J0"])), (n()(),
            u._18(-1, null, [", or "])), (n()(),
            u.Z(74, 0, null, null, 1, "b", [], null, null, null, null, null)), (n()(),
            u._18(-1, null, ["J1"])), (n()(),
            u._18(-1, null, [",\n  indicating that it is waiting to set up the WiFi network.\n  "])), (n()(),
            u._18(-1, null, ["\n  "])), (n()(),
            u.Z(78, 0, null, null, 2, "button", [["full", ""], ["ion-button", ""]], null, [[null, "click"]], function(n, l, t) {
                var e = !0;
                if ("click" === l) {
                    e = !1 !== n.component.close() && e
                }
                return e
            }, d.b, d.a)), u.Y(79, 1097728, null, 0, h.a, [[8, ""], o.a, u.j, u.z], {
                full: [0, "full"]
            }, null), (n()(),
            u._18(-1, 0, ["Close"])), (n()(),
            u._18(-1, null, ["\n"]))], function(n, l) {
                n(l, 14, 0, "arrow-dropleft-circle");
                n(l, 23, 0, "checkmark-circle");
                n(l, 35, 0, "arrow-dropleft-circle");
                n(l, 44, 0, "checkmark-circle");
                n(l, 53, 0, "arrow-dropleft-circle");
                n(l, 62, 0, "checkmark-circle");
                n(l, 79, 0, "")
            }, function(n, l) {
                n(l, 13, 0, u._13(l, 14)._hidden);
                n(l, 22, 0, u._13(l, 23)._hidden);
                n(l, 34, 0, u._13(l, 35)._hidden);
                n(l, 43, 0, u._13(l, 44)._hidden);
                n(l, 52, 0, u._13(l, 53)._hidden);
                n(l, 61, 0, u._13(l, 62)._hidden)
            })
        }
        t.d(l, "a", function() {
            return _
        });
        var u = t(0)
          , i = t(30)
          , o = t(2)
          , a = t(5)
          , r = t(9)
          , s = t(7)
          , c = t(27)
          , d = t(20)
          , h = t(14)
          , p = t(90)
          , g = t(6)
          , f = u.X({
            encapsulation: 2,
            styles: [],
            data: {}
        })
          , _ = u.V("page-reset-instructions", p.a, function(n) {
            return u._19(0, [(n()(),
            u.Z(0, 0, null, null, 1, "page-reset-instructions", [], null, null, null, e, f)), u.Y(1, 49152, null, 0, p.a, [g.a], null, null)], null, null)
        }, {}, {}, [])
    },
    430: function(n, l, t) {
        "use strict";
        function e(n) {
            return new K.a(n,{
                account: "",
                passwordHash: "",
                celsius: 0
            })
        }
        function u(n) {
            return Y._19(0, [(n()(),
            Y.Z(0, 0, null, null, 35, "div", [], null, null, null, null, null)), (n()(),
            Y._18(-1, null, ["\n  "])), (n()(),
            Y.Z(2, 0, null, null, 1, "div", [["class", "legend"]], null, null, null, null, null)), (n()(),
            Y._18(-1, null, ["\n  "])), (n()(),
            Y._18(-1, null, ["\n  "])), (n()(),
            Y.Z(5, 0, null, null, 6, "div", [["class", "svg-container"]], null, null, null, null, null)), (n()(),
            Y._18(-1, null, ["\n    "])), (n()(),
            Y.Z(7, 0, null, null, 1, "ion-spinner", [["float-right", ""], ["margin", ""], ["name", "dots"], ["style", "margin-right: 32px;"]], [[2, "trans", null], [2, "spinner-paused", null]], null, null, Ln.b, Ln.a)), Y.Y(8, 114688, null, 0, Un.a, [wn.a, Y.j, Y.z], {
                name: [0, "name"]
            }, null), (n()(),
            Y._18(-1, null, ["\n    "])), (n()(),
            Y.Z(10, 0, [["chartElement", 1]], null, 0, ":svg:svg", [["class", "svg-content"], ["version", "1.1"]], [[8, "id", 0]], null, null, null, null)), (n()(),
            Y._18(-1, null, ["\n  "])), (n()(),
            Y._18(-1, null, ["\n  "])), (n()(),
            Y.Z(13, 0, null, null, 21, "div", [["class", "cb-btn-bar"], ["padding", ""]], null, null, null, null, null)), (n()(),
            Y._18(-1, null, ["\n      "])), (n()(),
            Y.Z(15, 0, null, null, 2, "button", [["color", "light"], ["ion-button", ""], ["small", ""]], null, [[null, "click"]], function(n, l, t) {
                var e = !0;
                if ("click" === l) {
                    e = !1 !== n.component.setTimeSpan("one_hour") && e
                }
                return e
            }, yn.b, yn.a)), Y.Y(16, 1097728, null, 0, Cn.a, [[8, ""], wn.a, Y.j, Y.z], {
                color: [0, "color"],
                small: [1, "small"]
            }, null), (n()(),
            Y._18(-1, 0, ["Hour"])), (n()(),
            Y._18(-1, null, ["\n      "])), (n()(),
            Y.Z(19, 0, null, null, 2, "button", [["color", "light"], ["ion-button", ""], ["small", ""]], null, [[null, "click"]], function(n, l, t) {
                var e = !0;
                if ("click" === l) {
                    e = !1 !== n.component.setTimeSpan("six_hours") && e
                }
                return e
            }, yn.b, yn.a)), Y.Y(20, 1097728, null, 0, Cn.a, [[8, ""], wn.a, Y.j, Y.z], {
                color: [0, "color"],
                small: [1, "small"]
            }, null), (n()(),
            Y._18(-1, 0, ["6H"])), (n()(),
            Y._18(-1, null, ["\n      "])), (n()(),
            Y.Z(23, 0, null, null, 2, "button", [["color", "light"], ["ion-button", ""], ["small", ""]], null, [[null, "click"]], function(n, l, t) {
                var e = !0;
                if ("click" === l) {
                    e = !1 !== n.component.setTimeSpan("day") && e
                }
                return e
            }, yn.b, yn.a)), Y.Y(24, 1097728, null, 0, Cn.a, [[8, ""], wn.a, Y.j, Y.z], {
                color: [0, "color"],
                small: [1, "small"]
            }, null), (n()(),
            Y._18(-1, 0, ["Day"])), (n()(),
            Y._18(-1, null, ["\n      "])), (n()(),
            Y.Z(27, 0, null, null, 2, "button", [["color", "light"], ["ion-button", ""], ["small", ""]], null, [[null, "click"]], function(n, l, t) {
                var e = !0;
                if ("click" === l) {
                    e = !1 !== n.component.setTimeSpan("week") && e
                }
                return e
            }, yn.b, yn.a)), Y.Y(28, 1097728, null, 0, Cn.a, [[8, ""], wn.a, Y.j, Y.z], {
                color: [0, "color"],
                small: [1, "small"]
            }, null), (n()(),
            Y._18(-1, 0, ["Week"])), (n()(),
            Y._18(-1, null, ["\n      "])), (n()(),
            Y.Z(31, 0, null, null, 2, "button", [["color", "light"], ["ion-button", ""], ["small", ""]], null, [[null, "click"]], function(n, l, t) {
                var e = !0;
                if ("click" === l) {
                    e = !1 !== n.component.setTimeSpan("month") && e
                }
                return e
            }, yn.b, yn.a)), Y.Y(32, 1097728, null, 0, Cn.a, [[8, ""], wn.a, Y.j, Y.z], {
                color: [0, "color"],
                small: [1, "small"]
            }, null), (n()(),
            Y._18(-1, 0, ["Month"])), (n()(),
            Y._18(-1, null, ["\n  "])), (n()(),
            Y._18(-1, null, ["\n"])), (n()(),
            Y._18(-1, null, ["\n"]))], function(n, l) {
                n(l, 8, 0, "dots");
                n(l, 16, 0, "light", "");
                n(l, 20, 0, "light", "");
                n(l, 24, 0, "light", "");
                n(l, 28, 0, "light", "");
                n(l, 32, 0, "light", "")
            }, function(n, l) {
                var t = l.component;
                n(l, 7, 0, !t.isLoadingData(), Y._13(l, 8)._paused);
                n(l, 10, 0, t.guid)
            })
        }
        function i(n) {
            return Y._19(0, [Y._12(null, 0), (n()(),
            Y.U(0, null, null, 0))], null, null)
        }
        function o(n) {
            return Y._19(0, [(n()(),
            Y.Z(0, 0, null, null, 1, null, null, null, null, null, null, null)), (n()(),
            Y._18(1, null, ["", ""]))], null, function(n, l) {
                n(l, 1, 0, l.component.prepend)
            })
        }
        function a(n) {
            return Y._19(0, [Y._12(null, 1), (n()(),
            Y.U(0, null, null, 0))], null, null)
        }
        function r(n) {
            return Y._19(0, [(n()(),
            Y.Z(0, 0, null, null, 1, null, null, null, null, null, null, null)), (n()(),
            Y._18(1, null, ["", ""]))], null, function(n, l) {
                n(l, 1, 0, l.component.valueStr())
            })
        }
        function s(n) {
            return Y._19(0, [Y._12(null, 2), (n()(),
            Y.U(0, null, null, 0))], null, null)
        }
        function c(n) {
            return Y._19(0, [(n()(),
            Y.Z(0, 0, null, null, 1, null, null, null, null, null, null, null)), (n()(),
            Y._18(1, null, ["", ""]))], null, function(n, l) {
                n(l, 1, 0, l.component.append)
            })
        }
        function d(n) {
            return Y._19(0, [Y._12(null, 3), (n()(),
            Y.U(0, null, null, 0))], null, null)
        }
        function h(n) {
            return Y._19(0, [(n()(),
            Y.Z(0, 0, null, null, 1, null, null, null, null, null, null, null)), (n()(),
            Y._18(1, null, ["", ""]))], null, function(n, l) {
                n(l, 1, 0, l.component.label)
            })
        }
        function p(n) {
            return Y._19(0, [Y._16(402653184, 1, {
                _canvas: 0
            }), (n()(),
            Y.Z(1, 0, [["overlay", 1]], null, 36, "div", [], [[4, "opacity", null]], [[null, "mouseenter"], [null, "mouseleave"], [null, "mouseup"]], function(n, l, t) {
                var e = !0
                  , u = n.component;
                if ("mouseenter" === l) {
                    e = !1 !== u.onMouseEnter() && e
                }
                if ("mouseleave" === l) {
                    e = !1 !== u.onMouseLeave() && e
                }
                if ("mouseup" === l) {
                    e = !1 !== u.onMouseUp() && e
                }
                return e
            }, null, null)), (n()(),
            Y._18(-1, null, ["\n  "])), (n()(),
            Y.Z(3, 0, [["reading", 1]], null, 21, "div", [["class", "reading-block"]], [[4, "color", null], [4, "opacity", null], [4, "transition", null], [4, "fontSize", null], [4, "lineHeight", null]], null, null, null, null)), (n()(),
            Y._18(-1, null, ["\n    "])), (n()(),
            Y._18(-1, null, ["\n    "])), (n()(),
            Y.Z(6, 0, null, null, 5, "u", [["class", "reading-affix"]], null, null, null, null, null)), Y.Y(7, 16384, null, 0, Pn.m, [], {
                ngSwitch: [0, "ngSwitch"]
            }, null), (n()(),
            Y.U(16777216, null, null, 1, null, i)), Y.Y(9, 278528, null, 0, Pn.n, [Y.I, Y.F, Pn.m], {
                ngSwitchCase: [0, "ngSwitchCase"]
            }, null), (n()(),
            Y.U(16777216, null, null, 1, null, o)), Y.Y(11, 278528, null, 0, Pn.n, [Y.I, Y.F, Pn.m], {
                ngSwitchCase: [0, "ngSwitchCase"]
            }, null), (n()(),
            Y.Z(12, 0, null, null, 5, null, null, null, null, null, null, null)), Y.Y(13, 16384, null, 0, Pn.m, [], {
                ngSwitch: [0, "ngSwitch"]
            }, null), (n()(),
            Y.U(16777216, null, null, 1, null, a)), Y.Y(15, 278528, null, 0, Pn.n, [Y.I, Y.F, Pn.m], {
                ngSwitchCase: [0, "ngSwitchCase"]
            }, null), (n()(),
            Y.U(16777216, null, null, 1, null, r)), Y.Y(17, 278528, null, 0, Pn.n, [Y.I, Y.F, Pn.m], {
                ngSwitchCase: [0, "ngSwitchCase"]
            }, null), (n()(),
            Y.Z(18, 0, null, null, 5, "u", [["class", "reading-affix"]], null, null, null, null, null)), Y.Y(19, 16384, null, 0, Pn.m, [], {
                ngSwitch: [0, "ngSwitch"]
            }, null), (n()(),
            Y.U(16777216, null, null, 1, null, s)), Y.Y(21, 278528, null, 0, Pn.n, [Y.I, Y.F, Pn.m], {
                ngSwitchCase: [0, "ngSwitchCase"]
            }, null), (n()(),
            Y.U(16777216, null, null, 1, null, c)), Y.Y(23, 278528, null, 0, Pn.n, [Y.I, Y.F, Pn.m], {
                ngSwitchCase: [0, "ngSwitchCase"]
            }, null), (n()(),
            Y._18(-1, null, ["\n  "])), (n()(),
            Y._18(-1, null, ["\n  "])), (n()(),
            Y.Z(26, 0, null, null, 8, "div", [["class", "reading-label"]], [[4, "fontSize", null], [4, "lineHeight", null]], null, null, null, null)), Y.Y(27, 16384, null, 0, Pn.m, [], {
                ngSwitch: [0, "ngSwitch"]
            }, null), (n()(),
            Y._18(-1, null, ["\n    "])), (n()(),
            Y.U(16777216, null, null, 1, null, d)), Y.Y(30, 278528, null, 0, Pn.n, [Y.I, Y.F, Pn.m], {
                ngSwitchCase: [0, "ngSwitchCase"]
            }, null), (n()(),
            Y._18(-1, null, ["\n    "])), (n()(),
            Y.U(16777216, null, null, 1, null, h)), Y.Y(33, 278528, null, 0, Pn.n, [Y.I, Y.F, Pn.m], {
                ngSwitchCase: [0, "ngSwitchCase"]
            }, null), (n()(),
            Y._18(-1, null, ["\n  "])), (n()(),
            Y._18(-1, null, ["\n  "])), (n()(),
            Y.Z(36, 0, [[1, 0], ["canvas", 1]], null, 0, "canvas", [], [[8, "width", 0], [8, "height", 0]], null, null, null, null)), (n()(),
            Y._18(-1, null, ["\n"]))], function(n, l) {
                var t = l.component;
                n(l, 7, 0, null != t._prependChild);
                n(l, 9, 0, !0);
                n(l, 11, 0, !1);
                n(l, 13, 0, null != t._valueDisplayChild);
                n(l, 15, 0, !0);
                n(l, 17, 0, !1);
                n(l, 19, 0, null != t._appendChild);
                n(l, 21, 0, !0);
                n(l, 23, 0, !1);
                n(l, 27, 0, null != t._labelChild);
                n(l, 30, 0, !0);
                n(l, 33, 0, !1)
            }, function(n, l) {
                var t = l.component;
                n(l, 1, 0, t.overallOpacity);
                n(l, 3, 0, t.bigTxtColor, t.overallOpacity, t.bigTxtTrans, .22 * t.size + "px", t.size + "px");
                n(l, 26, 0, t.size / 13 + "px", 5 * t.size / 13 + t.size + "px");
                n(l, 36, 0, t.size, t.size)
            })
        }
        function g(n) {
            return Y._19(0, [(n()(),
            Y.Z(0, 0, null, null, 5, "ion-col", [["class", "device-title col"]], null, null, null, null, null)), Y.Y(1, 16384, null, 0, bn.a, [], null, null), (n()(),
            Y._18(-1, null, ["\n                "])), (n()(),
            Y.Z(3, 0, null, null, 1, "span", [], null, null, null, null, null)), (n()(),
            Y._18(4, null, ["", ""])), (n()(),
            Y._18(-1, null, ["\n              "]))], null, function(n, l) {
                n(l, 4, 0, l.component.device.name)
            })
        }
        function f(n) {
            return Y._19(0, [(n()(),
            Y.Z(0, 0, null, null, 5, "ion-col", [["class", "col"]], null, null, null, null, null)), Y.Y(1, 16384, null, 0, bn.a, [], null, null), (n()(),
            Y._18(-1, null, ["\n                "])), (n()(),
            Y.Z(3, 0, null, null, 1, "span", [], null, null, null, null, null)), (n()(),
            Y._18(-1, null, [" "])), (n()(),
            Y._18(-1, null, ["\n              "]))], null, null)
        }
        function _(n) {
            return Y._19(0, [(n()(),
            Y.Z(0, 0, null, null, 9, "ion-col", [["class", "col"], ["col-auto", ""]], null, null, null, null, null)), Y.Y(1, 16384, null, 0, bn.a, [], null, null), (n()(),
            Y._18(-1, null, ["\n                "])), (n()(),
            Y.Z(3, 0, null, null, 5, "button", [["color", "light"], ["icon-left", ""], ["ion-button", ""], ["small", ""]], null, [[null, "click"]], function(n, l, t) {
                var e = !0;
                if ("click" === l) {
                    e = !1 !== n.component.clickRefresh() && e
                }
                return e
            }, yn.b, yn.a)), Y.Y(4, 1097728, null, 0, Cn.a, [[8, ""], wn.a, Y.j, Y.z], {
                color: [0, "color"],
                small: [1, "small"]
            }, null), (n()(),
            Y._18(-1, 0, ["\n                  "])), (n()(),
            Y.Z(6, 0, null, 0, 1, "ion-icon", [["name", "refresh"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), Y.Y(7, 147456, null, 0, kn.a, [wn.a, Y.j, Y.z], {
                name: [0, "name"]
            }, null), (n()(),
            Y._18(-1, 0, ["\n                  Reconnect\n                "])), (n()(),
            Y._18(-1, null, ["\n              "]))], function(n, l) {
                n(l, 4, 0, "light", "");
                n(l, 7, 0, "refresh")
            }, function(n, l) {
                n(l, 6, 0, Y._13(l, 7)._hidden)
            })
        }
        function m(n) {
            return Y._19(0, [(n()(),
            Y.Z(0, 0, null, null, 1, "span", [["class", "heaterOn"]], null, null, null, null, null)), (n()(),
            Y._18(-1, null, ["On"]))], null, null)
        }
        function v(n) {
            return Y._19(0, [(n()(),
            Y.Z(0, 0, null, null, 1, "span", [["class", "heaterOff"]], null, null, null, null, null)), (n()(),
            Y._18(-1, null, ["Off"]))], null, null)
        }
        function b(n) {
            return Y._19(0, [(n()(),
            Y.Z(0, 0, null, null, 7, "div", [], null, null, null, null, null)), (n()(),
            Y._18(-1, null, ["Heater:\n            "])), (n()(),
            Y.U(16777216, null, null, 1, null, m)), Y.Y(3, 16384, null, 0, Pn.i, [Y.I, Y.F], {
                ngIf: [0, "ngIf"]
            }, null), (n()(),
            Y._18(-1, null, ["\n            "])), (n()(),
            Y.U(16777216, null, null, 1, null, v)), Y.Y(6, 16384, null, 0, Pn.i, [Y.I, Y.F], {
                ngIf: [0, "ngIf"]
            }, null), (n()(),
            Y._18(-1, null, ["\n          "]))], function(n, l) {
                var t = l.component;
                n(l, 3, 0, t.device.heaterOn);
                n(l, 6, 0, !t.device.heaterOn)
            }, null)
        }
        function y(n) {
            return Y._19(0, [(n()(),
            Y.Z(0, 0, null, null, 111, "ion-list", [], null, null, null, null, null)), Y.Y(1, 16384, null, 0, Sn.a, [wn.a, Y.j, Y.z, Tn.a, En.l, Yn.a], null, null), (n()(),
            Y._18(-1, null, ["\n      "])), (n()(),
            Y.Z(3, 0, null, null, 107, "ion-item", [["class", "item item-block"]], null, null, null, In.b, In.a)), Y.Y(4, 1097728, null, 3, xn.a, [jn.a, wn.a, Y.j, Y.z, [2, Dn.a]], null, null), Y._16(335544320, 8, {
                contentLabel: 0
            }), Y._16(603979776, 9, {
                _buttons: 1
            }), Y._16(603979776, 10, {
                _icons: 1
            }), Y.Y(8, 16384, null, 0, An.a, [], null, null), (n()(),
            Y._18(-1, 2, ["\n        "])), (n()(),
            Y.Z(10, 0, null, 1, 2, "ion-label", [], null, null, null, null, null)), Y.Y(11, 16384, [[8, 4]], 0, Zn.a, [wn.a, Y.j, Y.z, [8, null], [8, null], [8, null], [8, null]], null, null), (n()(),
            Y._18(-1, null, ["Diagnostic chart"])), (n()(),
            Y._18(-1, 2, ["\n        "])), (n()(),
            Y.Z(14, 0, null, 3, 95, "ion-select", [["interface", "popover"], ["item-end", ""]], [[2, "select-disabled", null], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngModelChange"], [null, "ionChange"], [null, "click"], [null, "keyup.space"]], function(n, l, t) {
                var e = !0
                  , u = n.component;
                if ("click" === l) {
                    e = !1 !== Y._13(n, 15)._click(t) && e
                }
                if ("keyup.space" === l) {
                    e = !1 !== Y._13(n, 15)._keyup() && e
                }
                if ("ngModelChange" === l) {
                    e = !1 !== (u.pinToShow = t) && e
                }
                if ("ionChange" === l) {
                    e = !1 !== u.changeChartPin() && e
                }
                return e
            }, Nn.b, Nn.a)), Y.Y(15, 1228800, null, 1, On.a, [Mn.a, jn.a, wn.a, Y.j, Y.z, [2, xn.a], Rn.a], {
                interface: [0, "interface"]
            }, {
                ionChange: "ionChange"
            }), Y._16(603979776, 11, {
                options: 1
            }), Y._15(1024, null, zn.l, function(n) {
                return [n]
            }, [On.a]), Y.Y(18, 671744, null, 0, zn.q, [[8, null], [8, null], [8, null], [2, zn.l]], {
                model: [0, "model"]
            }, {
                update: "ngModelChange"
            }), Y._15(2048, null, zn.m, null, [zn.q]), Y.Y(20, 16384, null, 0, zn.n, [zn.m], null, null), (n()(),
            Y._18(-1, null, ["\n          "])), (n()(),
            Y.Z(22, 0, null, null, 2, "ion-option", [["value", ""]], null, null, null, null, null)), Y.Y(23, 16384, [[11, 4]], 0, Fn.a, [Y.j], {
                value: [0, "value"]
            }, null), (n()(),
            Y._18(-1, null, ["none"])), (n()(),
            Y._18(-1, null, ["\n          "])), (n()(),
            Y.Z(26, 0, null, null, 2, "ion-option", [["value", "v18"]], null, null, null, null, null)), Y.Y(27, 16384, [[11, 4]], 0, Fn.a, [Y.j], {
                value: [0, "value"]
            }, null), (n()(),
            Y._18(-1, null, ["RSSI"])), (n()(),
            Y._18(-1, null, ["\n          "])), (n()(),
            Y.Z(30, 0, null, null, 2, "ion-option", [["value", "v0"]], null, null, null, null, null)), Y.Y(31, 16384, [[11, 4]], 0, Fn.a, [Y.j], {
                value: [0, "value"]
            }, null), (n()(),
            Y._18(-1, null, ["Room temp"])), (n()(),
            Y._18(-1, null, ["\n          "])), (n()(),
            Y.Z(34, 0, null, null, 2, "ion-option", [["value", "v1"]], null, null, null, null, null)), Y.Y(35, 16384, [[11, 4]], 0, Fn.a, [Y.j], {
                value: [0, "value"]
            }, null), (n()(),
            Y._18(-1, null, ["Fins temp"])), (n()(),
            Y._18(-1, null, ["\n          "])), (n()(),
            Y.Z(38, 0, null, null, 2, "ion-option", [["value", "v26"]], null, null, null, null, null)), Y.Y(39, 16384, [[11, 4]], 0, Fn.a, [Y.j], {
                value: [0, "value"]
            }, null), (n()(),
            Y._18(-1, null, ["Heater On"])), (n()(),
            Y._18(-1, null, ["\n          "])), (n()(),
            Y.Z(42, 0, null, null, 2, "ion-option", [["value", "v33"]], null, null, null, null, null)), Y.Y(43, 16384, [[11, 4]], 0, Fn.a, [Y.j], {
                value: [0, "value"]
            }, null), (n()(),
            Y._18(-1, null, ["OTA request"])), (n()(),
            Y._18(-1, null, ["\n          "])), (n()(),
            Y.Z(46, 0, null, null, 2, "ion-option", [["value", "v22"]], null, null, null, null, null)), Y.Y(47, 16384, [[11, 4]], 0, Fn.a, [Y.j], {
                value: [0, "value"]
            }, null), (n()(),
            Y._18(-1, null, ["Enable email notifications"])), (n()(),
            Y._18(-1, null, ["\n          "])), (n()(),
            Y.Z(50, 0, null, null, 2, "ion-option", [["value", "v23"]], null, null, null, null, null)), Y.Y(51, 16384, [[11, 4]], 0, Fn.a, [Y.j], {
                value: [0, "value"]
            }, null), (n()(),
            Y._18(-1, null, ["Enable SMS notifications"])), (n()(),
            Y._18(-1, null, ["\n          "])), (n()(),
            Y.Z(54, 0, null, null, 2, "ion-option", [["value", "v100"]], null, null, null, null, null)), Y.Y(55, 16384, [[11, 4]], 0, Fn.a, [Y.j], {
                value: [0, "value"]
            }, null), (n()(),
            Y._18(-1, null, ["Offline event"])), (n()(),
            Y._18(-1, null, ["\n          "])), (n()(),
            Y.Z(58, 0, null, null, 2, "ion-option", [["value", "v14"]], null, null, null, null, null)), Y.Y(59, 16384, [[11, 4]], 0, Fn.a, [Y.j], {
                value: [0, "value"]
            }, null), (n()(),
            Y._18(-1, null, ["Hardware event"])), (n()(),
            Y._18(-1, null, ["\n          "])), (n()(),
            Y.Z(62, 0, null, null, 2, "ion-option", [["value", "v30"]], null, null, null, null, null)), Y.Y(63, 16384, [[11, 4]], 0, Fn.a, [Y.j], {
                value: [0, "value"]
            }, null), (n()(),
            Y._18(-1, null, ["Room sensor event"])), (n()(),
            Y._18(-1, null, ["\n          "])), (n()(),
            Y.Z(66, 0, null, null, 2, "ion-option", [["value", "v31"]], null, null, null, null, null)), Y.Y(67, 16384, [[11, 4]], 0, Fn.a, [Y.j], {
                value: [0, "value"]
            }, null), (n()(),
            Y._18(-1, null, ["Fins sensor event"])), (n()(),
            Y._18(-1, null, ["\n          "])), (n()(),
            Y.Z(70, 0, null, null, 2, "ion-option", [["value", "v32"]], null, null, null, null, null)), Y.Y(71, 16384, [[11, 4]], 0, Fn.a, [Y.j], {
                value: [0, "value"]
            }, null), (n()(),
            Y._18(-1, null, ["Heater event"])), (n()(),
            Y._18(-1, null, ["\n          "])), (n()(),
            Y.Z(74, 0, null, null, 2, "ion-option", [["value", "v17"]], null, null, null, null, null)), Y.Y(75, 16384, [[11, 4]], 0, Fn.a, [Y.j], {
                value: [0, "value"]
            }, null), (n()(),
            Y._18(-1, null, ["Low event"])), (n()(),
            Y._18(-1, null, ["\n          "])), (n()(),
            Y.Z(78, 0, null, null, 2, "ion-option", [["value", "v13"]], null, null, null, null, null)), Y.Y(79, 16384, [[11, 4]], 0, Fn.a, [Y.j], {
                value: [0, "value"]
            }, null), (n()(),
            Y._18(-1, null, ["High event"])), (n()(),
            Y._18(-1, null, ["\n          "])), (n()(),
            Y.Z(82, 0, null, null, 2, "ion-option", [["value", "v4"]], null, null, null, null, null)), Y.Y(83, 16384, [[11, 4]], 0, Fn.a, [Y.j], {
                value: [0, "value"]
            }, null), (n()(),
            Y._18(-1, null, ["Set point"])), (n()(),
            Y._18(-1, null, ["\n          "])), (n()(),
            Y.Z(86, 0, null, null, 2, "ion-option", [["value", "v6"]], null, null, null, null, null)), Y.Y(87, 16384, [[11, 4]], 0, Fn.a, [Y.j], {
                value: [0, "value"]
            }, null), (n()(),
            Y._18(-1, null, ["Fins set point"])), (n()(),
            Y._18(-1, null, ["\n          "])), (n()(),
            Y.Z(90, 0, null, null, 2, "ion-option", [["value", "v8"]], null, null, null, null, null)), Y.Y(91, 16384, [[11, 4]], 0, Fn.a, [Y.j], {
                value: [0, "value"]
            }, null), (n()(),
            Y._18(-1, null, ["Heater delay"])), (n()(),
            Y._18(-1, null, ["\n          "])), (n()(),
            Y.Z(94, 0, null, null, 2, "ion-option", [["value", "v16"]], null, null, null, null, null)), Y.Y(95, 16384, [[11, 4]], 0, Fn.a, [Y.j], {
                value: [0, "value"]
            }, null), (n()(),
            Y._18(-1, null, ["Low threshold"])), (n()(),
            Y._18(-1, null, ["\n          "])), (n()(),
            Y.Z(98, 0, null, null, 2, "ion-option", [["value", "v12"]], null, null, null, null, null)), Y.Y(99, 16384, [[11, 4]], 0, Fn.a, [Y.j], {
                value: [0, "value"]
            }, null), (n()(),
            Y._18(-1, null, ["High threshold"])), (n()(),
            Y._18(-1, null, ["\n          "])), (n()(),
            Y.Z(102, 0, null, null, 2, "ion-option", [["value", "v19"]], null, null, null, null, null)), Y.Y(103, 16384, [[11, 4]], 0, Fn.a, [Y.j], {
                value: [0, "value"]
            }, null), (n()(),
            Y._18(-1, null, ["Schema"])), (n()(),
            Y._18(-1, null, ["\n          "])), (n()(),
            Y.Z(106, 0, null, null, 2, "ion-option", [["value", "v34"]], null, null, null, null, null)), Y.Y(107, 16384, [[11, 4]], 0, Fn.a, [Y.j], {
                value: [0, "value"]
            }, null), (n()(),
            Y._18(-1, null, ["Reset thresholds"])), (n()(),
            Y._18(-1, null, ["\n        "])), (n()(),
            Y._18(-1, 2, ["\n      "])), (n()(),
            Y._18(-1, null, ["\n    "]))], function(n, l) {
                var t = l.component;
                n(l, 15, 0, "popover");
                n(l, 18, 0, t.pinToShow);
                n(l, 23, 0, "");
                n(l, 27, 0, "v18");
                n(l, 31, 0, "v0");
                n(l, 35, 0, "v1");
                n(l, 39, 0, "v26");
                n(l, 43, 0, "v33");
                n(l, 47, 0, "v22");
                n(l, 51, 0, "v23");
                n(l, 55, 0, "v100");
                n(l, 59, 0, "v14");
                n(l, 63, 0, "v30");
                n(l, 67, 0, "v31");
                n(l, 71, 0, "v32");
                n(l, 75, 0, "v17");
                n(l, 79, 0, "v13");
                n(l, 83, 0, "v4");
                n(l, 87, 0, "v6");
                n(l, 91, 0, "v8");
                n(l, 95, 0, "v16");
                n(l, 99, 0, "v12");
                n(l, 103, 0, "v19");
                n(l, 107, 0, "v34")
            }, function(n, l) {
                n(l, 14, 0, Y._13(l, 15)._disabled, Y._13(l, 20).ngClassUntouched, Y._13(l, 20).ngClassTouched, Y._13(l, 20).ngClassPristine, Y._13(l, 20).ngClassDirty, Y._13(l, 20).ngClassValid, Y._13(l, 20).ngClassInvalid, Y._13(l, 20).ngClassPending)
            })
        }
        function C(n) {
            return Y._19(0, [(n()(),
            Y.Z(0, 0, [[3, 0], ["pinChartHolder", 1]], null, 4, "div", [], null, null, null, null, null)), (n()(),
            Y._18(-1, null, ["\n      "])), (n()(),
            Y.Z(2, 0, null, null, 1, "blynk-chart", [], null, null, null, u, Bn)), Y.Y(3, 49152, [[2, 4], ["pinChart", 4]], 0, Hn.a, [$.a, J.a], {
                deviceID: [0, "deviceID"],
                widgetID: [1, "widgetID"]
            }, null), (n()(),
            Y._18(-1, null, ["\n    "]))], function(n, l) {
                var t = l.component;
                n(l, 3, 0, t.device.id, t.pinToShow)
            }, null)
        }
        function w(n) {
            return Y._19(0, [Y._16(402653184, 1, {
                tempChart: 0
            }), Y._16(671088640, 2, {
                pinChart: 0
            }), Y._16(671088640, 3, {
                pinChartHolder: 0
            }), (n()(),
            Y.Z(3, 0, null, null, 82, "ion-row", [["class", "row"]], null, null, null, null, null)), Y.Y(4, 16384, null, 0, Vn.a, [], null, null), (n()(),
            Y._18(-1, null, ["\n  \n  "])), (n()(),
            Y.Z(6, 0, null, null, 65, "ion-col", [["class", "col"], ["col-12", ""], ["col-lg-3", ""], ["style", "padding:0"], ["text-center", ""]], null, null, null, null, null)), Y.Y(7, 16384, null, 0, bn.a, [], null, null), (n()(),
            Y._18(-1, null, ["\n    "])), (n()(),
            Y.Z(9, 0, null, null, 61, "ion-grid", [["class", "grid"], ["style", "padding:0"]], null, null, null, null, null)), Y.Y(10, 16384, null, 0, qn.a, [], null, null), (n()(),
            Y._18(-1, null, ["  "])), (n()(),
            Y._18(-1, null, ["\n      "])), (n()(),
            Y.Z(13, 0, null, null, 56, "ion-row", [["class", "row"]], null, null, null, null, null)), Y.Y(14, 16384, null, 0, Vn.a, [], null, null), (n()(),
            Y._18(-1, null, ["\n\n        "])), (n()(),
            Y.Z(16, 0, null, null, 37, "ion-col", [["align-self-center", ""], ["class", "col"], ["col-12", ""], ["col-lg-12", ""], ["col-md-6", ""], ["col-sm-5", ""], ["push-lg-0", ""], ["push-md-6", ""], ["push-sm-7", ""], ["style", "padding:0"]], null, null, null, null, null)), Y.Y(17, 16384, null, 0, bn.a, [], null, null), (n()(),
            Y._18(-1, null, ["\n          "])), (n()(),
            Y.Z(19, 0, null, null, 33, "ion-grid", [["class", "grid"], ["id", "statusGrid"]], null, null, null, null, null)), Y.Y(20, 278528, null, 0, Pn.g, [Y.p, Y.q, Y.j, Y.A], {
                ngClass: [0, "ngClass"]
            }, null), Y._14(21, {
                "has-device-name": 0
            }), Y.Y(22, 16384, null, 0, qn.a, [], null, null), (n()(),
            Y._18(-1, null, ["\n            "])), (n()(),
            Y.Z(24, 0, null, null, 8, "ion-row", [["class", "row"], ["text-center", ""]], null, null, null, null, null)), Y.Y(25, 16384, null, 0, Vn.a, [], null, null), (n()(),
            Y._18(-1, null, ["\n              "])), (n()(),
            Y.U(16777216, null, null, 1, null, g)), Y.Y(28, 16384, null, 0, Pn.i, [Y.I, Y.F], {
                ngIf: [0, "ngIf"]
            }, null), (n()(),
            Y._18(-1, null, ["\n              "])), (n()(),
            Y.U(16777216, null, null, 1, null, f)), Y.Y(31, 16384, null, 0, Pn.i, [Y.I, Y.F], {
                ngIf: [0, "ngIf"]
            }, null), (n()(),
            Y._18(-1, null, ["\n            "])), (n()(),
            Y._18(-1, null, ["\n            "])), (n()(),
            Y.Z(34, 0, null, null, 17, "ion-row", [["class", "row"], ["id", "statusBox"], ["text-center", ""]], [[8, "className", 0]], null, null, null, null)), Y.Y(35, 16384, null, 0, Vn.a, [], null, null), (n()(),
            Y._18(-1, null, ["\n              "])), (n()(),
            Y.Z(37, 0, null, null, 10, "ion-col", [["class", "col"], ["col-auto", ""]], null, null, null, null, null)), Y.Y(38, 16384, null, 0, bn.a, [], null, null), (n()(),
            Y._18(-1, null, ["\n                "])), (n()(),
            Y.Z(40, 0, null, null, 3, "p", [["no-margin", ""]], null, null, null, null, null)), (n()(),
            Y.Z(41, 0, null, null, 1, "ion-icon", [["role", "img"]], [[2, "hide", null]], null, null, null, null)), Y.Y(42, 147456, null, 0, kn.a, [wn.a, Y.j, Y.z], {
                name: [0, "name"]
            }, null), (n()(),
            Y._18(43, null, [" \n                  ", "\n                "])), (n()(),
            Y._18(-1, null, ["\n                "])), (n()(),
            Y.Z(45, 0, null, null, 1, "p", [], [[8, "className", 0]], null, null, null, null)), (n()(),
            Y._18(46, null, ["Notify: ", ""])), (n()(),
            Y._18(-1, null, ["\n              "])), (n()(),
            Y._18(-1, null, ["\n              "])), (n()(),
            Y.U(16777216, null, null, 1, null, _)), Y.Y(50, 16384, null, 0, Pn.i, [Y.I, Y.F], {
                ngIf: [0, "ngIf"]
            }, null), (n()(),
            Y._18(-1, null, ["\n            "])), (n()(),
            Y._18(-1, null, ["\n          "])), (n()(),
            Y._18(-1, null, ["\n        "])), (n()(),
            Y._18(-1, null, ["\n\n        "])), (n()(),
            Y.Z(55, 0, null, null, 13, "ion-col", [["class", "col"], ["col-12", ""], ["col-lg-12", ""], ["col-md-6", ""], ["col-sm-7", ""], ["pull-lg-0", ""], ["pull-md-6", ""], ["pull-sm-5", ""], ["text-center", ""]], null, null, null, null, null)), Y.Y(56, 16384, null, 0, bn.a, [], null, null), (n()(),
            Y._18(-1, null, ["\n          "])), (n()(),
            Y.Z(58, 0, null, null, 6, "ngx-gauge", [["autoShowAll", "true"], ["cap", "round"], ["label", "Room Temp"], ["role", "meter"], ["size", "170"], ["type", "arch"]], [[2, "ngx-gauge-meter", null], [1, "aria-valuemin", 0], [1, "aria-valuemax", 0], [1, "aria-valuenow", 0]], null, null, p, Gn)), Y.Y(59, 4898816, null, 4, Wn.a, [Y.j, Y.z], {
                size: [0, "size"],
                min: [1, "min"],
                dataUpdateFlag: [2, "dataUpdateFlag"],
                max: [3, "max"],
                type: [4, "type"],
                cap: [5, "cap"],
                thick: [6, "thick"],
                label: [7, "label"],
                append: [8, "append"],
                overallOpacity: [9, "overallOpacity"],
                autoShowAll: [10, "autoShowAll"],
                valueLow: [11, "valueLow"],
                valueHigh: [12, "valueHigh"],
                valueSet: [13, "valueSet"],
                value: [14, "value"]
            }, null), Y._16(335544320, 4, {
                _labelChild: 0
            }), Y._16(335544320, 5, {
                _prependChild: 0
            }), Y._16(335544320, 6, {
                _appendChild: 0
            }), Y._16(335544320, 7, {
                _valueDisplayChild: 0
            }), (n()(),
            Y._18(-1, null, ["\n          "])), (n()(),
            Y._18(-1, null, ["\n          "])), (n()(),
            Y.U(16777216, null, null, 1, null, b)), Y.Y(67, 16384, null, 0, Pn.i, [Y.I, Y.F], {
                ngIf: [0, "ngIf"]
            }, null), (n()(),
            Y._18(-1, null, ["\n        "])), (n()(),
            Y._18(-1, null, ["\n\n      "])), (n()(),
            Y._18(-1, null, ["\n    "])), (n()(),
            Y._18(-1, null, ["\n  "])), (n()(),
            Y._18(-1, null, ["\n\n  "])), (n()(),
            Y.Z(73, 0, null, null, 11, "ion-col", [["align-self-center", ""], ["class", "col"], ["col-12", ""], ["col-lg-9", ""]], null, null, null, null, null)), Y.Y(74, 16384, null, 0, bn.a, [], null, null), (n()(),
            Y._18(-1, null, ["\n    "])), (n()(),
            Y.Z(76, 0, null, null, 1, "blynk-chart", [["widgetID", "v0"]], null, null, null, u, Bn)), Y.Y(77, 49152, [[1, 4], ["tempChart", 4]], 0, Hn.a, [$.a, J.a], {
                deviceID: [0, "deviceID"],
                widgetID: [1, "widgetID"]
            }, null), (n()(),
            Y._18(-1, null, ["\n\n    "])), (n()(),
            Y.U(16777216, null, null, 1, null, y)), Y.Y(80, 16384, null, 0, Pn.i, [Y.I, Y.F], {
                ngIf: [0, "ngIf"]
            }, null), (n()(),
            Y._18(-1, null, ["\n\n    "])), (n()(),
            Y.U(16777216, null, null, 1, null, C)), Y.Y(83, 16384, null, 0, Pn.i, [Y.I, Y.F], {
                ngIf: [0, "ngIf"]
            }, null), (n()(),
            Y._18(-1, null, ["\n  "])), (n()(),
            Y._18(-1, null, ["\n\n"])), (n()(),
            Y._18(-1, null, ["\n"]))], function(n, l) {
                var t = l.component;
                n(l, 20, 0, n(l, 21, 0, t.device.isNameSet()));
                n(l, 28, 0, t.device.isNameSet());
                n(l, 31, 0, !t.device.isNameSet());
                n(l, 42, 0, t.getStatusCode(t.device.status).icon);
                n(l, 50, 0, t.getShowRefresh());
                n(l, 59, 1, ["170", t.minGaugeTemp.getDisp(), t.device.newReading, t.maxGaugeTemp.getDisp(), "arch", "round", 10, "Room Temp", t.getUnits(), t.roomGaugeOpacity(), "true", t.device.tooColdTemp.getDisp(), t.device.tooHotTemp.getDisp(), t.device.setTemp.getDisp(), t.device.roomTemp.getDisp()]);
                n(l, 67, 0, t.device.canShowHeaterOn() && (t.masquerade.canMasquerade || t.masquerade.masquerading));
                n(l, 77, 0, t.device.id, "v0");
                n(l, 80, 0, t.masquerade.canMasquerade || t.masquerade.masquerading);
                n(l, 83, 0, (t.masquerade.canMasquerade || t.masquerade.masquerading) && "" != t.pinToShow)
            }, function(n, l) {
                var t = l.component;
                n(l, 34, 0, "status" + t.getStatusCode(t.device.status).class);
                n(l, 41, 0, Y._13(l, 42)._hidden);
                n(l, 43, 0, t.getStatusCode(t.device.status).text);
                n(l, 45, 0, t.getNotifyStatusClass());
                n(l, 46, 0, t.getNotifyType());
                n(l, 58, 0, !0, Y._13(l, 59).min, Y._13(l, 59).max, Y._13(l, 59).value)
            })
        }
        function k(n) {
            return Y._19(0, [(n()(),
            Y.Z(0, 0, null, null, 2, "dashboard-device", [], null, null, null, w, Kn)), Y.Y(1, 4308992, [[1, 4], ["dev", 4]], 0, $n.a, [$.a, Q.a], {
                device: [0, "device"]
            }, null), (n()(),
            Y._18(-1, null, ["\n    "]))], function(n, l) {
                n(l, 1, 0, l.context.$implicit)
            }, null)
        }
        function P(n) {
            return Y._19(0, [Y._16(671088640, 1, {
                devices: 1
            }), (n()(),
            Y.Z(1, 0, null, null, 9, "ion-content", [], [[2, "statusbar-padding", null], [2, "has-refresher", null]], null, null, Jn.b, Jn.a)), Y.Y(2, 4374528, null, 0, Xn.a, [wn.a, Tn.a, Yn.a, Y.j, Y.z, Mn.a, Qn.a, Y.u, [2, nl.a], [2, ll.a]], null, null), (n()(),
            Y._18(-1, 1, ["\n  "])), (n()(),
            Y.Z(4, 0, null, 1, 5, "ion-grid", [["class", "grid"]], null, null, null, null, null)), Y.Y(5, 16384, null, 0, qn.a, [], null, null), (n()(),
            Y._18(-1, null, ["\n    "])), (n()(),
            Y.U(16777216, null, null, 1, null, k)), Y.Y(8, 802816, null, 0, Pn.h, [Y.I, Y.F, Y.p], {
                ngForOf: [0, "ngForOf"]
            }, null), (n()(),
            Y._18(-1, null, ["\n  "])), (n()(),
            Y._18(-1, 1, ["\n"])), (n()(),
            Y._18(-1, null, ["\n"]))], function(n, l) {
                n(l, 8, 0, l.component.blynk.devices)
            }, function(n, l) {
                n(l, 1, 0, Y._13(l, 2).statusbarPadding, Y._13(l, 2)._hasRefresher)
            })
        }
        function S(n) {
            return Y._19(0, [(n()(),
            Y.Z(0, 0, null, null, 4, "ion-nav", [], null, null, null, cl.b, cl.a)), Y._15(6144, null, dl.a, null, [hl.a]), Y.Y(2, 278528, null, 0, Pn.g, [Y.p, Y.q, Y.j, Y.A], {
                ngClass: [0, "ngClass"]
            }, null), Y._14(3, {
                "ionic-container": 0
            }), Y.Y(4, 4374528, [["mycontent", 4]], 0, hl.a, [[2, nl.a], [2, ll.a], Mn.a, wn.a, Tn.a, Y.j, Y.u, Y.z, Y.i, En.l, pl.a, [2, Rn.a], Yn.a, Y.k], {
                root: [0, "root"]
            }, null), (n()(),
            Y._18(-1, null, ["\n"])), (n()(),
            Y.Z(6, 0, null, null, 40, "ion-menu", [["role", "navigation"], ["side", "right"], ["swipeEnabled", "false"]], null, null, null, gl.b, gl.a)), Y._15(6144, null, dl.a, null, [fl.a]), Y.Y(8, 245760, null, 2, fl.a, [_l.a, Y.j, wn.a, Tn.a, Y.z, Qn.a, En.l, Yn.a, Mn.a], {
                content: [0, "content"],
                side: [1, "side"],
                swipeEnabled: [2, "swipeEnabled"]
            }, null), Y._16(335544320, 1, {
                menuContent: 0
            }), Y._16(335544320, 2, {
                menuNav: 0
            }), (n()(),
            Y._18(-1, 0, ["\n  "])), (n()(),
            Y.Z(12, 0, null, 0, 33, "ion-content", [], [[2, "statusbar-padding", null], [2, "has-refresher", null]], null, null, Jn.b, Jn.a)), Y.Y(13, 4374528, [[1, 4]], 0, Xn.a, [wn.a, Tn.a, Yn.a, Y.j, Y.z, Mn.a, Qn.a, Y.u, [2, nl.a], [2, ll.a]], null, null), (n()(),
            Y._18(-1, 1, ["\n    "])), (n()(),
            Y.Z(15, 0, null, 1, 29, "ion-list", [], null, null, null, null, null)), Y.Y(16, 16384, null, 0, Sn.a, [wn.a, Y.j, Y.z, Tn.a, En.l, Yn.a], null, null), (n()(),
            Y._18(-1, null, ["\n      "])), (n()(),
            Y.Z(18, 0, null, null, 12, "ion-item", [["class", "item item-block"]], null, null, null, In.b, In.a)), Y.Y(19, 1097728, null, 3, xn.a, [jn.a, wn.a, Y.j, Y.z, [2, Dn.a]], null, null), Y._16(335544320, 3, {
                contentLabel: 0
            }), Y._16(603979776, 4, {
                _buttons: 1
            }), Y._16(603979776, 5, {
                _icons: 1
            }), Y.Y(23, 16384, null, 0, An.a, [], null, null), (n()(),
            Y._18(24, 2, ["", "\n        "])), (n()(),
            Y.Z(25, 0, null, 0, 4, "button", [["clear", ""], ["ion-button", ""], ["item-start", ""], ["menuClose", ""]], null, [[null, "click"]], function(n, l, t) {
                var e = !0;
                if ("click" === l) {
                    e = !1 !== Y._13(n, 27).close() && e
                }
                return e
            }, yn.b, yn.a)), Y.Y(26, 1097728, [[4, 4]], 0, Cn.a, [[8, ""], wn.a, Y.j, Y.z], {
                clear: [0, "clear"]
            }, null), Y.Y(27, 16384, null, 0, ml.a, [_l.a], {
                menuClose: [0, "menuClose"]
            }, null), (n()(),
            Y.Z(28, 0, null, 0, 1, "ion-icon", [["name", "close"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), Y.Y(29, 147456, null, 0, kn.a, [wn.a, Y.j, Y.z], {
                name: [0, "name"]
            }, null), (n()(),
            Y._18(-1, 2, ["\n      "])), (n()(),
            Y._18(-1, null, ["\n      "])), (n()(),
            Y.Z(32, 0, null, null, 11, "ion-item", [["class", "item item-block"]], null, null, null, In.b, In.a)), Y.Y(33, 1097728, null, 3, xn.a, [jn.a, wn.a, Y.j, Y.z, [2, Dn.a]], null, null), Y._16(335544320, 6, {
                contentLabel: 0
            }), Y._16(603979776, 7, {
                _buttons: 1
            }), Y._16(603979776, 8, {
                _icons: 1
            }), Y.Y(37, 16384, null, 0, An.a, [], null, null), (n()(),
            Y._18(-1, 2, ["\n        "])), (n()(),
            Y.Z(39, 0, null, 2, 3, "button", [["block", ""], ["color", "primary"], ["ion-button", ""], ["menuClose", ""]], null, [[null, "click"]], function(n, l, t) {
                var e = !0
                  , u = n.component;
                if ("click" === l) {
                    e = !1 !== Y._13(n, 41).close() && e
                }
                if ("click" === l) {
                    e = !1 !== u.blynk.doLogout() && e
                }
                return e
            }, yn.b, yn.a)), Y.Y(40, 1097728, [[7, 4]], 0, Cn.a, [[8, ""], wn.a, Y.j, Y.z], {
                color: [0, "color"],
                block: [1, "block"]
            }, null), Y.Y(41, 16384, null, 0, ml.a, [_l.a], {
                menuClose: [0, "menuClose"]
            }, null), (n()(),
            Y._18(-1, 0, ["Log out"])), (n()(),
            Y._18(-1, 2, ["\n      "])), (n()(),
            Y._18(-1, null, ["\n    "])), (n()(),
            Y._18(-1, 1, ["\n  "])), (n()(),
            Y._18(-1, 0, ["\n"])), (n()(),
            Y._18(-1, null, ["\n"]))], function(n, l) {
                var t = l.component;
                n(l, 2, 0, n(l, 3, 0, t.isDesktop));
                n(l, 4, 0, t.rootPage);
                n(l, 8, 0, Y._13(l, 4), "right", "false");
                n(l, 26, 0, "");
                n(l, 27, 0, "");
                n(l, 29, 0, "close");
                n(l, 40, 0, "primary", "");
                n(l, 41, 0, "")
            }, function(n, l) {
                var t = l.component;
                n(l, 12, 0, Y._13(l, 13).statusbarPadding, Y._13(l, 13)._hasRefresher);
                n(l, 24, 0, null == t.blynk ? null : t.blynk._account);
                n(l, 28, 0, Y._13(l, 29)._hidden)
            })
        }
        function T(n) {
            return Y._19(0, [(n()(),
            Y.Z(0, 0, null, null, 17, "ion-tabs", [["tabsPlacement", "top"]], null, null, null, Cl.b, Cl.a)), Y._15(6144, null, dl.a, null, [wl.a]), Y.Y(2, 4374528, null, 0, wl.a, [[2, ll.a], [2, nl.a], Mn.a, wn.a, Y.j, Tn.a, Y.z, Rn.a, Qn.a], {
                tabsPlacement: [0, "tabsPlacement"]
            }, null), (n()(),
            Y._18(-1, 0, ["\n  "])), (n()(),
            Y.Z(4, 0, null, 0, 1, "ion-tab", [["role", "tabpanel"], ["tabIcon", "speedometer"], ["tabTitle", "Status"], ["tabUrlPath", "status"]], [[1, "id", 0], [1, "aria-labelledby", 0]], null, null, kl.b, kl.a)), Y.Y(5, 245760, null, 0, Pl.a, [wl.a, Mn.a, wn.a, Tn.a, Y.j, Y.u, Y.z, Y.i, Y.g, En.l, pl.a, [2, Rn.a], Yn.a, Y.k], {
                root: [0, "root"],
                tabUrlPath: [1, "tabUrlPath"],
                tabTitle: [2, "tabTitle"],
                tabIcon: [3, "tabIcon"]
            }, null), (n()(),
            Y._18(-1, 0, ["\n  "])), (n()(),
            Y.Z(7, 0, null, 0, 2, "ion-tab", [["role", "tabpanel"], ["tabBadgeStyle", "danger"], ["tabIcon", "pricetags"], ["tabTitle", "Devices"], ["tabUrlPath", "devices"]], [[1, "id", 0], [1, "aria-labelledby", 0]], null, null, kl.b, kl.a)), Y.Y(8, 245760, null, 0, Pl.a, [wl.a, Mn.a, wn.a, Tn.a, Y.j, Y.u, Y.z, Y.i, Y.g, En.l, pl.a, [2, Rn.a], Yn.a, Y.k], {
                root: [0, "root"],
                tabUrlPath: [1, "tabUrlPath"],
                tabTitle: [2, "tabTitle"],
                tabIcon: [3, "tabIcon"],
                tabBadge: [4, "tabBadge"],
                tabBadgeStyle: [5, "tabBadgeStyle"]
            }, null), (n()(),
            Y._18(-1, null, ["\n  "])), (n()(),
            Y._18(-1, 0, ["\n  "])), (n()(),
            Y.Z(11, 0, null, 0, 2, "ion-tab", [["role", "tabpanel"], ["tabBadgeStyle", "default"], ["tabIcon", "person"], ["tabTitle", "Account"], ["tabUrlPath", "account"]], [[1, "id", 0], [1, "aria-labelledby", 0]], null, null, kl.b, kl.a)), Y.Y(12, 245760, null, 0, Pl.a, [wl.a, Mn.a, wn.a, Tn.a, Y.j, Y.u, Y.z, Y.i, Y.g, En.l, pl.a, [2, Rn.a], Yn.a, Y.k], {
                root: [0, "root"],
                tabUrlPath: [1, "tabUrlPath"],
                tabTitle: [2, "tabTitle"],
                tabIcon: [3, "tabIcon"],
                tabBadge: [4, "tabBadge"],
                tabBadgeStyle: [5, "tabBadgeStyle"]
            }, null), (n()(),
            Y._18(-1, null, ["\n  "])), (n()(),
            Y._18(-1, 0, ["\n  "])), (n()(),
            Y.Z(15, 0, null, 0, 1, "ion-tab", [["role", "tabpanel"], ["tabIcon", "coolbotlogo"]], [[1, "id", 0], [1, "aria-labelledby", 0]], [[null, "ionSelect"]], function(n, l, t) {
                var e = !0;
                if ("ionSelect" === l) {
                    e = !1 !== n.component.clickLogo() && e
                }
                return e
            }, kl.b, kl.a)), Y.Y(16, 245760, null, 0, Pl.a, [wl.a, Mn.a, wn.a, Tn.a, Y.j, Y.u, Y.z, Y.i, Y.g, En.l, pl.a, [2, Rn.a], Yn.a, Y.k], {
                tabIcon: [0, "tabIcon"]
            }, {
                ionSelect: "ionSelect"
            }), (n()(),
            Y._18(-1, 0, ["\n"])), (n()(),
            Y._18(-1, null, ["\n"]))], function(n, l) {
                var t = l.component;
                n(l, 2, 0, "top");
                n(l, 5, 0, t.tab1Root, "status", "Status", "speedometer");
                n(l, 8, 0, t.tab2Root, "devices", "Devices", "pricetags", t.monitor.deviceMessages, "danger");
                n(l, 12, 0, t.tab3Root, "account", "Account", "person", t.masquerade.masquerading ? "*" : "", "default");
                n(l, 16, 0, "coolbotlogo")
            }, function(n, l) {
                n(l, 4, 0, Y._13(l, 5)._tabId, Y._13(l, 5)._btnId);
                n(l, 7, 0, Y._13(l, 8)._tabId, Y._13(l, 8)._btnId);
                n(l, 11, 0, Y._13(l, 12)._tabId, Y._13(l, 12)._btnId);
                n(l, 15, 0, Y._13(l, 16)._tabId, Y._13(l, 16)._btnId)
            })
        }
        Object.defineProperty(l, "__esModule", {
            value: !0
        });
        var E = t(50)
          , Y = t(0)
          , I = (t(3),
        t(222))
          , x = t(92)
          , j = t(64)
          , D = (t(13),
        t(171))
          , A = t(47)
          , Z = t(201)
          , N = t(200)
          , O = t(202)
          , M = t(150)
          , R = function() {
            return function() {}
        }()
          , z = t(203)
          , F = t(205)
          , L = t(207)
          , U = t(206)
          , H = t(208)
          , B = t(209)
          , V = t(70)
          , q = (t(112),
        t(110),
        t(153),
        t(77),
        t(114),
        t(149))
          , W = (t(113),
        t(116),
        t(90))
          , G = t(148)
          , $ = t(15)
          , K = (t(147),
        t(32))
          , J = t(69)
          , X = t(88)
          , Q = t(36)
          , nn = t(52)
          , ln = t(37)
          , tn = t(105)
          , en = X.b
          , un = function() {
            return function() {}
        }()
          , on = t(93)
          , an = t(410)
          , rn = t(411)
          , sn = t(412)
          , cn = t(413)
          , dn = t(414)
          , hn = t(415)
          , pn = t(416)
          , gn = t(417)
          , fn = t(418)
          , _n = t(422)
          , mn = t(421)
          , vn = t(423)
          , bn = t(42)
          , yn = t(20)
          , Cn = t(14)
          , wn = t(2)
          , kn = t(27)
          , Pn = t(10)
          , Sn = t(30)
          , Tn = t(5)
          , En = t(9)
          , Yn = t(7)
          , In = t(38)
          , xn = t(18)
          , jn = t(17)
          , Dn = t(28)
          , An = t(33)
          , Zn = t(41)
          , Nn = t(106)
          , On = t(61)
          , Mn = t(8)
          , Rn = t(22)
          , zn = t(16)
          , Fn = t(60)
          , Ln = t(262)
          , Un = t(101)
          , Hn = t(192)
          , Bn = Y.X({
            encapsulation: 2,
            styles: [],
            data: {}
        })
          , Vn = t(43)
          , qn = t(58)
          , Wn = t(193)
          , Gn = Y.X({
            encapsulation: 2,
            styles: [],
            data: {}
        })
          , $n = t(194)
          , Kn = Y.X({
            encapsulation: 2,
            styles: [],
            data: {}
        })
          , Jn = t(72)
          , Xn = t(23)
          , Qn = t(26)
          , nl = t(6)
          , ll = t(21)
          , tl = Y.X({
            encapsulation: 2,
            styles: [],
            data: {}
        })
          , el = Y.V("page-home", M.a, function(n) {
            return Y._19(0, [(n()(),
            Y.Z(0, 0, null, null, 1, "page-home", [], null, null, null, P, tl)), Y.Y(1, 49152, null, 0, M.a, [$.a], null, null)], null, null)
        }, {}, {}, [])
          , ul = t(424)
          , il = t(425)
          , ol = t(427)
          , al = t(426)
          , rl = t(428)
          , sl = t(429)
          , cl = t(524)
          , dl = t(46)
          , hl = t(99)
          , pl = t(44)
          , gl = t(525)
          , fl = t(128)
          , _l = t(34)
          , ml = t(168)
          , vl = t(76)
          , bl = Y.X({
            encapsulation: 2,
            styles: [],
            data: {}
        })
          , yl = Y.V("ng-component", V.c, function(n) {
            return Y._19(0, [(n()(),
            Y.Z(0, 0, null, null, 1, "ng-component", [], null, null, null, S, bl)), Y.Y(1, 49152, null, 0, V.c, [Tn.a, G.a, Q.a, vl.a, $.a, K.a, tn.a], null, null)], null, null)
        }, {}, {}, [])
          , Cl = t(526)
          , wl = t(85)
          , kl = t(527)
          , Pl = t(141)
          , Sl = Y.X({
            encapsulation: 2,
            styles: [],
            data: {}
        })
          , Tl = Y.V("ng-component", q.a, function(n) {
            return Y._19(0, [(n()(),
            Y.Z(0, 0, null, null, 1, "ng-component", [], null, null, null, T, Sl)), Y.Y(1, 49152, null, 0, q.a, [J.a, X.a, Q.a], null, null)], null, null)
        }, {}, {}, [])
          , El = t(178)
          , Yl = t(223)
          , Il = t(159)
          , xl = t(120)
          , jl = t(63)
          , Dl = t(177)
          , Al = t(40)
          , Zl = t(98)
          , Nl = t(196)
          , Ol = t(95)
          , Ml = t(71)
          , Rl = t(102)
          , zl = t(122)
          , Fl = t(137)
          , Ll = t(180)
          , Ul = t(248)
          , Hl = t(404)
          , Bl = t(409)
          , Vl = t(179)
          , ql = t(170)
          , Wl = t(181)
          , Gl = t(197)
          , $l = t(115)
          , Kl = t(199)
          , Jl = Y.W(un, [on.b], function(n) {
            return Y._10([Y._11(512, Y.i, Y.S, [[8, [an.a, rn.a, sn.a, cn.a, dn.a, hn.a, pn.a, gn.a, fn.a, _n.a, mn.a, vn.a, el, ul.a, il.a, ol.a, al.a, rl.a, sl.a, yl, Tl]], [3, Y.i], Y.s]), Y._11(5120, Y.r, Y._9, [[3, Y.r]]), Y._11(4608, Pn.k, Pn.j, [Y.r, [2, Pn.s]]), Y._11(5120, Y.b, Y._0, []), Y._11(5120, Y.p, Y._6, []), Y._11(5120, Y.q, Y._7, []), Y._11(4608, E.c, E.q, [Pn.c]), Y._11(6144, Y.D, null, [E.c]), Y._11(4608, E.f, El.a, []), Y._11(5120, E.d, function(n, l, t, e, u) {
                return [new E.k(n,l), new E.o(t), new E.n(e,u)]
            }, [Pn.c, Y.u, Pn.c, Pn.c, E.f]), Y._11(4608, E.e, E.e, [E.d, Y.u]), Y._11(135680, E.m, E.m, [Pn.c]), Y._11(4608, E.l, E.l, [E.e, E.m]), Y._11(5120, Yl.a, I.d, []), Y._11(5120, Yl.c, I.e, []), Y._11(4608, Yl.b, I.c, [Yl.a, Yl.c]), Y._11(5120, Y.B, I.f, [E.l, Yl.b, Y.u]), Y._11(6144, E.p, null, [E.m]), Y._11(4608, Y.G, Y.G, [Y.u]), Y._11(4608, E.h, E.h, [Pn.c]), Y._11(4608, E.i, E.i, [Pn.c]), Y._11(4608, Il.b, I.b, [Y.B, E.b]), Y._11(4608, zn.B, zn.B, []), Y._11(4608, zn.f, zn.f, []), Y._11(4608, x.c, x.c, []), Y._11(4608, x.g, x.b, []), Y._11(5120, x.i, x.j, []), Y._11(4608, x.h, x.h, [x.c, x.g, x.i]), Y._11(4608, x.f, x.a, []), Y._11(5120, x.d, x.k, [x.h, x.f]), Y._11(4608, j.i, j.n, [Pn.c, Y.w, j.l]), Y._11(4608, j.o, j.o, [j.i, j.m]), Y._11(5120, j.a, function(n) {
                return [n]
            }, [j.o]), Y._11(4608, j.k, j.k, []), Y._11(6144, j.j, null, [j.k]), Y._11(4608, j.h, j.h, [j.j]), Y._11(6144, j.b, null, [j.h]), Y._11(5120, j.f, j.p, [j.b, [2, j.a]]), Y._11(4608, j.c, j.c, [j.f]), Y._11(4608, xl.a, xl.a, [Mn.a, wn.a]), Y._11(4608, jl.a, jl.a, [Mn.a, wn.a]), Y._11(4608, Dl.a, Dl.a, []), Y._11(4608, jn.a, jn.a, []), Y._11(4608, Al.a, Al.a, [Tn.a]), Y._11(4608, Qn.a, Qn.a, [wn.a, Tn.a, Y.u, Yn.a]), Y._11(4608, Zl.a, Zl.a, [Mn.a, wn.a]), Y._11(5120, Pn.f, Nl.c, [Pn.q, [2, Pn.a], wn.a]), Y._11(4608, Pn.e, Pn.e, [Pn.f]), Y._11(5120, Ol.b, Ol.d, [Mn.a, Ol.a]), Y._11(5120, Rn.a, Rn.b, [Mn.a, Ol.b, Pn.e, Ml.b, Y.i]), Y._11(4608, Rl.a, Rl.a, [Mn.a, wn.a, Rn.a]), Y._11(4608, zl.a, zl.a, [Mn.a, wn.a]), Y._11(4608, Fl.a, Fl.a, [Mn.a, wn.a, Rn.a]), Y._11(4608, Ll.a, Ll.a, [wn.a, Tn.a, Yn.a, Mn.a, En.l]), Y._11(4608, vl.a, vl.a, [Mn.a, wn.a]), Y._11(4608, pl.a, pl.a, [Tn.a, wn.a]), Y._11(5120, Ul.a, Ul.c, [Ul.b]), Y._11(4608, G.a, G.a, []), Y._11(5120, K.a, e, [Ul.a]), Y._11(4608, $.a, Hl.a, [j.c, K.a, Mn.a]), Y._11(5120, X.a, en, []), Y._11(4608, J.a, J.a, [x.d, $.a]), Y._11(4608, nn.a, nn.a, [$.a, j.c]), Y._11(4608, tn.a, tn.a, [$.a, Fl.a]), Y._11(4608, ln.a, ln.a, [Mn.a, $.a, nn.a, tn.a]), Y._11(4608, Q.a, Q.a, [$.a, ln.a]), Y._11(512, Pn.b, Pn.b, []), Y._11(512, Y.k, Bl.a, []), Y._11(256, wn.b, {}, []), Y._11(1024, Vl.a, Vl.b, []), Y._11(1024, Tn.a, Tn.b, [E.b, Vl.a, Y.u]), Y._11(1024, wn.a, wn.c, [wn.b, Tn.a]), Y._11(512, Yn.a, Yn.a, [Tn.a]), Y._11(512, _l.a, _l.a, []), Y._11(512, Mn.a, Mn.a, [wn.a, Tn.a, [2, _l.a]]), Y._11(512, En.l, En.l, [Mn.a]), Y._11(256, Ol.a, {
                links: [{
                    loadChildren: "../pages/develop/develop.module.ngfactory#DevelopPageModuleNgFactory",
                    name: "DevelopPage",
                    segment: "develop",
                    priority: "low",
                    defaultHistory: []
                }, {
                    loadChildren: "../pages/devices/devices.module.ngfactory#DevicesPageModuleNgFactory",
                    name: "DevicesPage",
                    segment: "devices",
                    priority: "low",
                    defaultHistory: []
                }, {
                    loadChildren: "../pages/login/login.module.ngfactory#LoginPageModuleNgFactory",
                    name: "LoginPage",
                    segment: "login",
                    priority: "low",
                    defaultHistory: []
                }, {
                    loadChildren: "../pages/named-settings/named-settings.module.ngfactory#NamedSettingsPageModuleNgFactory",
                    name: "NamedSettingsPage",
                    segment: "named-settings",
                    priority: "low",
                    defaultHistory: []
                }, {
                    loadChildren: "../pages/new-account/new-account.module.ngfactory#NewAccountPageModuleNgFactory",
                    name: "NewAccountPage",
                    segment: "new-account",
                    priority: "low",
                    defaultHistory: []
                }, {
                    loadChildren: "../pages/new-device/new-device.module.ngfactory#NewDevicePageModuleNgFactory",
                    name: "new-device",
                    segment: "new-device/:token",
                    priority: "low",
                    defaultHistory: []
                }, {
                    loadChildren: "../pages/referral/referral.module.ngfactory#ReferralPageModuleNgFactory",
                    name: "ReferralPage",
                    segment: "referral",
                    priority: "low",
                    defaultHistory: []
                }, {
                    loadChildren: "../pages/profile/profile.module.ngfactory#ProfilePageModuleNgFactory",
                    name: "ProfilePage",
                    segment: "profile",
                    priority: "low",
                    defaultHistory: []
                }, {
                    loadChildren: "../pages/register/register.module.ngfactory#RegisterPageModuleNgFactory",
                    name: "RegisterPage",
                    segment: "register",
                    priority: "low",
                    defaultHistory: []
                }, {
                    loadChildren: "../pages/reset-instructions/reset-instructions.module.ngfactory#ResetInstructionsPageModuleNgFactory",
                    name: "ResetInstructionsPage",
                    segment: "reset-instructions",
                    priority: "low",
                    defaultHistory: []
                }, {
                    loadChildren: "../pages/setup-mode-instructions/setup-mode-instructions.module.ngfactory#SetupModeInstructionsPageModuleNgFactory",
                    name: "SetupModeInstructionsPage",
                    segment: "setup-mode-instructions",
                    priority: "low",
                    defaultHistory: []
                }, {
                    loadChildren: "../pages/support/support.module.ngfactory#SupportPageModuleNgFactory",
                    name: "SupportPage",
                    segment: "support",
                    priority: "low",
                    defaultHistory: []
                }]
            }, []), Y._11(512, Y.h, Y.h, []), Y._11(512, ql.a, ql.a, [Y.h]), Y._11(1024, Ml.b, Ml.c, [ql.a, Y.o]), Y._11(1024, Y.c, function(n, l, t, e, u, i, o, a, r, s, c, d, h) {
                return [E.s(n), Wl.a(l), Dl.b(t, e), Ll.b(u, i, o, a, r), Ml.d(s, c, d, h)]
            }, [[2, Y.t], wn.a, Tn.a, Yn.a, wn.a, Tn.a, Yn.a, Mn.a, En.l, wn.a, Ol.a, Ml.b, Y.u]), Y._11(512, Y.d, Y.d, [[2, Y.c]]), Y._11(131584, Y.f, Y.f, [Y.u, Y.T, Y.o, Y.k, Y.i, Y.d]), Y._11(512, Y.e, Y.e, [Y.f]), Y._11(512, E.a, E.a, [[3, E.a]]), Y._11(512, I.a, I.a, []), Y._11(512, zn.x, zn.x, []), Y._11(512, zn.i, zn.i, []), Y._11(512, zn.t, zn.t, []), Y._11(512, Nl.a, Nl.a, []), Y._11(512, D.a, D.a, []), Y._11(512, x.e, x.e, []), Y._11(512, j.e, j.e, []), Y._11(512, j.d, j.d, []), Y._11(512, Gl.a, Gl.a, []), Y._11(512, A.a, A.a, []), Y._11(512, Nl.b, Nl.b, []), Y._11(512, $l.b, $l.b, []), Y._11(512, Z.a, Z.a, []), Y._11(512, N.a, N.a, []), Y._11(512, O.a, O.a, []), Y._11(512, R, R, []), Y._11(512, Kl.a, Kl.a, []), Y._11(512, z.a, z.a, []), Y._11(512, F.a, F.a, []), Y._11(512, L.a, L.a, []), Y._11(512, U.a, U.a, []), Y._11(512, H.a, H.a, []), Y._11(512, B.a, B.a, []), Y._11(512, un, un, []), Y._11(256, j.l, "XSRF-TOKEN", []), Y._11(256, j.m, "X-XSRF-TOKEN", []), Y._11(256, Ml.a, W.a, []), Y._11(256, on.a, V.c, []), Y._11(256, Pn.a, "/", []), Y._11(256, Ul.b, null, [])])
        });
        Object(Y.M)(),
        Object(E.j)().bootstrapModuleFactory(Jl)
    },
    469: function(n, l) {},
    47: function(n, l, t) {
        "use strict";
        t.d(l, "a", function() {
            return e
        });
        t(3),
        t(13),
        t(144),
        t(145),
        t(197),
        t(87),
        t(146),
        t(194),
        t(195);
        var e = function() {
            return function() {}
        }()
    },
    471: function(n, l) {},
    514: function(n, l, t) {
        function e(n) {
            return t(u(n))
        }
        function u(n) {
            var l = i[n];
            if (!(l + 1))
                throw new Error("Cannot find module '" + n + "'.");
            return l
        }
        var i = {
            "./af": 279,
            "./af.js": 279,
            "./ar": 280,
            "./ar-dz": 281,
            "./ar-dz.js": 281,
            "./ar-kw": 282,
            "./ar-kw.js": 282,
            "./ar-ly": 283,
            "./ar-ly.js": 283,
            "./ar-ma": 284,
            "./ar-ma.js": 284,
            "./ar-sa": 285,
            "./ar-sa.js": 285,
            "./ar-tn": 286,
            "./ar-tn.js": 286,
            "./ar.js": 280,
            "./az": 287,
            "./az.js": 287,
            "./be": 288,
            "./be.js": 288,
            "./bg": 289,
            "./bg.js": 289,
            "./bm": 290,
            "./bm.js": 290,
            "./bn": 291,
            "./bn.js": 291,
            "./bo": 292,
            "./bo.js": 292,
            "./br": 293,
            "./br.js": 293,
            "./bs": 294,
            "./bs.js": 294,
            "./ca": 295,
            "./ca.js": 295,
            "./cs": 296,
            "./cs.js": 296,
            "./cv": 297,
            "./cv.js": 297,
            "./cy": 298,
            "./cy.js": 298,
            "./da": 299,
            "./da.js": 299,
            "./de": 300,
            "./de-at": 301,
            "./de-at.js": 301,
            "./de-ch": 302,
            "./de-ch.js": 302,
            "./de.js": 300,
            "./dv": 303,
            "./dv.js": 303,
            "./el": 304,
            "./el.js": 304,
            "./en-au": 305,
            "./en-au.js": 305,
            "./en-ca": 306,
            "./en-ca.js": 306,
            "./en-gb": 307,
            "./en-gb.js": 307,
            "./en-ie": 308,
            "./en-ie.js": 308,
            "./en-il": 309,
            "./en-il.js": 309,
            "./en-nz": 310,
            "./en-nz.js": 310,
            "./eo": 311,
            "./eo.js": 311,
            "./es": 312,
            "./es-do": 313,
            "./es-do.js": 313,
            "./es-us": 314,
            "./es-us.js": 314,
            "./es.js": 312,
            "./et": 315,
            "./et.js": 315,
            "./eu": 316,
            "./eu.js": 316,
            "./fa": 317,
            "./fa.js": 317,
            "./fi": 318,
            "./fi.js": 318,
            "./fo": 319,
            "./fo.js": 319,
            "./fr": 320,
            "./fr-ca": 321,
            "./fr-ca.js": 321,
            "./fr-ch": 322,
            "./fr-ch.js": 322,
            "./fr.js": 320,
            "./fy": 323,
            "./fy.js": 323,
            "./gd": 324,
            "./gd.js": 324,
            "./gl": 325,
            "./gl.js": 325,
            "./gom-latn": 326,
            "./gom-latn.js": 326,
            "./gu": 327,
            "./gu.js": 327,
            "./he": 328,
            "./he.js": 328,
            "./hi": 329,
            "./hi.js": 329,
            "./hr": 330,
            "./hr.js": 330,
            "./hu": 331,
            "./hu.js": 331,
            "./hy-am": 332,
            "./hy-am.js": 332,
            "./id": 333,
            "./id.js": 333,
            "./is": 334,
            "./is.js": 334,
            "./it": 335,
            "./it.js": 335,
            "./ja": 336,
            "./ja.js": 336,
            "./jv": 337,
            "./jv.js": 337,
            "./ka": 338,
            "./ka.js": 338,
            "./kk": 339,
            "./kk.js": 339,
            "./km": 340,
            "./km.js": 340,
            "./kn": 341,
            "./kn.js": 341,
            "./ko": 342,
            "./ko.js": 342,
            "./ky": 343,
            "./ky.js": 343,
            "./lb": 344,
            "./lb.js": 344,
            "./lo": 345,
            "./lo.js": 345,
            "./lt": 346,
            "./lt.js": 346,
            "./lv": 347,
            "./lv.js": 347,
            "./me": 348,
            "./me.js": 348,
            "./mi": 349,
            "./mi.js": 349,
            "./mk": 350,
            "./mk.js": 350,
            "./ml": 351,
            "./ml.js": 351,
            "./mn": 352,
            "./mn.js": 352,
            "./mr": 353,
            "./mr.js": 353,
            "./ms": 354,
            "./ms-my": 355,
            "./ms-my.js": 355,
            "./ms.js": 354,
            "./mt": 356,
            "./mt.js": 356,
            "./my": 357,
            "./my.js": 357,
            "./nb": 358,
            "./nb.js": 358,
            "./ne": 359,
            "./ne.js": 359,
            "./nl": 360,
            "./nl-be": 361,
            "./nl-be.js": 361,
            "./nl.js": 360,
            "./nn": 362,
            "./nn.js": 362,
            "./pa-in": 363,
            "./pa-in.js": 363,
            "./pl": 364,
            "./pl.js": 364,
            "./pt": 365,
            "./pt-br": 366,
            "./pt-br.js": 366,
            "./pt.js": 365,
            "./ro": 367,
            "./ro.js": 367,
            "./ru": 368,
            "./ru.js": 368,
            "./sd": 369,
            "./sd.js": 369,
            "./se": 370,
            "./se.js": 370,
            "./si": 371,
            "./si.js": 371,
            "./sk": 372,
            "./sk.js": 372,
            "./sl": 373,
            "./sl.js": 373,
            "./sq": 374,
            "./sq.js": 374,
            "./sr": 375,
            "./sr-cyrl": 376,
            "./sr-cyrl.js": 376,
            "./sr.js": 375,
            "./ss": 377,
            "./ss.js": 377,
            "./sv": 378,
            "./sv.js": 378,
            "./sw": 379,
            "./sw.js": 379,
            "./ta": 380,
            "./ta.js": 380,
            "./te": 381,
            "./te.js": 381,
            "./tet": 382,
            "./tet.js": 382,
            "./tg": 383,
            "./tg.js": 383,
            "./th": 384,
            "./th.js": 384,
            "./tl-ph": 385,
            "./tl-ph.js": 385,
            "./tlh": 386,
            "./tlh.js": 386,
            "./tr": 387,
            "./tr.js": 387,
            "./tzl": 388,
            "./tzl.js": 388,
            "./tzm": 389,
            "./tzm-latn": 390,
            "./tzm-latn.js": 390,
            "./tzm.js": 389,
            "./ug-cn": 391,
            "./ug-cn.js": 391,
            "./uk": 392,
            "./uk.js": 392,
            "./ur": 393,
            "./ur.js": 393,
            "./uz": 394,
            "./uz-latn": 395,
            "./uz-latn.js": 395,
            "./uz.js": 394,
            "./vi": 396,
            "./vi.js": 396,
            "./x-pseudo": 397,
            "./x-pseudo.js": 397,
            "./yo": 398,
            "./yo.js": 398,
            "./zh-cn": 399,
            "./zh-cn.js": 399,
            "./zh-hk": 400,
            "./zh-hk.js": 400,
            "./zh-tw": 401,
            "./zh-tw.js": 401
        };
        e.keys = function() {
            return Object.keys(i)
        }
        ,
        e.resolve = u,
        n.exports = e,
        e.id = 514
    },
    52: function(n, l, t) {
        "use strict";
        t.d(l, "a", function() {
            return u
        });
        t(3),
        t(15);
        var e = t(70)
          , u = function() {
            function n(n, l) {
                this.blynk = n,
                this.http = l,
                this.DISABLE_DEMOGRAPHICS = !1
            }
            return n.prototype.isActive = function() {
                return this.getStatus().then(function(n) {
                    return "Active" == n
                })
            }
            ,
            n.prototype.getStatus = function() {
                var n = this;
                return this.blynk.getProfile().then(function(l) {
                    if (l && l.subscription) {
                        var t = l.subscription;
                        return console.log("Subscription: ", t),
                        n.getSubStatus(t)
                    }
                    return console.log("No subscription in profile."),
                    "unknown"
                })
            }
            ,
            n.prototype.getSubStatus = function(n) {
                return n.isActive ? "Active" : n.metadata && n.metadata.cb_status ? "Canceled" : void 0
            }
            ,
            n.prototype.needDemographics = function() {
                var n = this;
                return this.blynk.canLogIn() ? this.blynk.getProfile().then(function(l) {
                    return !(l && l.subscription && l.subscription.metadata && l.subscription.metadata.cb_id) && ((!l || !n.blynk.getCachedAccountMetadata().gotDemographics) && !n.DISABLE_DEMOGRAPHICS)
                }) : Promise.resolve(!1)
            }
            ,
            n.prototype.demographicsLogged = function(n) {
                var l = this.blynk;
                return this.blynk.updateAccountMetadata({
                    gotDemographics: 1,
                    fullName: function(n, l, t) {
                        void 0 === t && (t = " ");
                        var e = n;
                        return n && l ? e = e + t + l : e += l,
                        e
                    }(n.firstname, n.lastname),
                    mobileNumber: l.genericizeMobileNumberForUsage(n.mobilephone)
                })
            }
            ,
            n.prototype.getSubsUrl = function(n) {
                var l = e.b ? ":3000" : "";
                return this.blynk.serverUrl() + l + "/subs/" + n + "?username=" + encodeURIComponent(this.blynk.account) + "&pass=" + encodeURIComponent(this.blynk.passwordHash)
            }
            ,
            n
        }()
    },
    69: function(n, l, t) {
        "use strict";
        t.d(l, "a", function() {
            return s
        });
        t(3);
        var e = t(54)
          , u = (t.n(e),
        t(35))
          , i = t.n(u)
          , o = t(86)
          , a = (t(15),
        !1)
          , r = 1e4
          , s = function() {
            function n(n, l) {
                var t = this;
                this.http = n,
                this.blynk = l,
                this.statusSource = new e.Subject,
                this.status$ = this.statusSource.asObservable(),
                this.blynk.onPin("*", o.c, function() {
                    return t.onDeviceFirmware()
                }),
                this.hardwareActivity = this.blynk.hardwareActivity$.subscribe(function(n) {
                    return t.onHardwareActivity(n)
                }),
                this.serverConnected = this.blynk.serverConnected$.subscribe(function(n) {
                    return t.updateCurrentStatus()
                }),
                document.addEventListener("visibilitychange", function() {
                    return t.onVisbilityChanged()
                }, !1),
                a && (this.deadConnectionTimer = setInterval(function() {
                    return t.checkDeadConnection()
                }, r)),
                this.lastActivityTime = Date.now(),
                window.addEventListener("focus", this.maybeReconnect)
            }
            return n.prototype.onDeviceFirmware = function() {
                this.deviceMessages = i.a.countBy(this.blynk.devices, function(n) {
                    return n.firmwareUpgrade()
                })[!0] || 0
            }
            ,
            n.prototype.updateCurrentStatus = function() {
                var n = this.status();
                this.blynk.isConnected() ? this.connectionStatus = "OK" : "server" != this.connectionStatus && (this.connectionStatus = "socket"),
                this.status() != n && this.statusSource.next(this.status()),
                this.maybeReconnect()
            }
            ,
            n.prototype.status = function() {
                return this.connectionStatus
            }
            ,
            n.prototype.maybeReconnect = function() {
                var n = this;
                "socket" != this.connectionStatus || this.blynk && !this.blynk.isDead() && !this.blynk.isDisconnected() || document.hidden || !this.blynk.persistent || (this.doReconnect(),
                setTimeout(function() {
                    "socket" != n.connectionStatus || document.hidden || console.log("Monitor.maybeReconnect() is reconnecting after a timeout."),
                    n.doReconnect()
                }, 4e3))
            }
            ,
            n.prototype.doReconnect = function() {
                var n = this;
                this.blynk.doLogin().then(function() {
                    return n.blynk.appSync()
                }).catch(function(l) {
                    return n.connectionStatus = "server"
                })
            }
            ,
            n.prototype.onVisbilityChanged = function() {
                document.hidden || this.updateCurrentStatus()
            }
            ,
            n.prototype.onHardwareActivity = function(n) {
                n.active && (this.lastActivityTime = Date.now()),
                this.updateCurrentStatus()
            }
            ,
            n.prototype.checkDeadConnection = function() {
                this.blynk.isConnected() && Date.now() - this.lastActivityTime > 12e4 && (console.log("Breaking WebSocket connection due to timeout."),
                this.blynk.breakSocket(),
                this.lastActivityTime = Date.now())
            }
            ,
            n
        }()
    },
    70: function(n, l, t) {
        "use strict";
        t.d(l, "b", function() {
            return u
        }),
        t.d(l, "a", function() {
            return i
        }),
        t.d(l, "c", function() {
            return b
        });
        t(3),
        t(13),
        t(148);
        var e = t(77)
          , u = !1
          , i = "1.20.6"
          , o = u ? "192.168.0.27" : "cbsrv.storeitcold.com"
          , a = u ? "192.168.0.27" : "cbws.storeitcold.com"
          , r = 8080
          , s = u ? 8443 : 443
          , c = !u
          , d = o
          , h = d
          , p = u ? "60:F1:D9:92:98:84:6F:37:B6:01:E4:ED:91:52:47:B2:3F:5B:C5:3F:EE:0B:83:3F:30:93:AC:2B:BC:86:B6:04" : "5A:74:8C:F2:5B:96:50:4A:17:5E:8F:E2:AC:30:3C:69:13:DA:B0:C7"
          , g = 8442
          , f = 8441
          , _ = !0
          , m = "CoolBot"
          , v = "cd632b17741a4c618bc5925ba11a360f"
          , b = function() {
            return function(n, l, t, u, b, y, C) {
                var w = this;
                this.toastCtrl = u,
                this.blynk = b,
                this.rootPage = "LoginPage",
                this.isDesktop = !1,
                n.is("core") && (this.isDesktop = !0),
                n.url().indexOf("new-device") > -1 && (this.rootPage = e.a),
                b.server = c ? a : o,
                b.wsPort = r,
                b.wssPort = s,
                b.secure = c,
                b.secureHardware = _,
                b.secureHardwareHost = h,
                b.insecureHardwareHost = d,
                b.secureHardwareHostPort = f,
                b.insecureHardwareHostPort = g,
                b.serverFingerprint = p,
                b.appVersion = i,
                b.appName = m,
                b.appToken = v,
                b.showError = function(n) {
                    w.toastCtrl.create({
                        message: n,
                        duration: 5e3,
                        position: "top",
                        cssClass: "error-header"
                    }).present()
                }
                ,
                n.ready().then(function() {
                    l.hide()
                })
            }
        }()
    },
    77: function(n, l, t) {
        "use strict";
        t(3),
        t(0),
        t(92),
        t(13);
        var e = t(35)
          , u = t.n(e)
          , i = t(403)
          , o = t.n(i)
          , a = (t(15),
        t(149))
          , r = t(90)
          , s = function() {
            function n(n) {
                this.http = n
            }
            return n.prototype.get = function(n, l, t, e) {
                void 0 === t && (t = void 0),
                void 0 === e && (e = 3),
                this.stop(),
                this.urls = "string" == typeof n ? [n] : n,
                this.onSuccess = l,
                this.onFailure = t,
                this.currentUrl = 0,
                this.maxFailures = e,
                this.remainingRepeats = e,
                this.tryGet(),
                this.start()
            }
            ,
            n.prototype.start = function() {
                var n = this;
                this.timer = setInterval(function() {
                    return n.timerService()
                }, 6e3)
            }
            ,
            n.prototype.timerService = function() {
                if (this.maxFailures && this.remainingRepeats <= 0)
                    return this.stop(),
                    void this.onFailure({
                        status: 0,
                        transient: !1
                    });
                this.tryGet()
            }
            ,
            n.prototype.tryGet = function() {
                var n = this;
                this.clearPending(),
                this.remainingRepeats -= 1,
                console.log("CONFIG: GET " + this.urls[this.currentUrl] + "...");
                try {
                    var l = this.urls[this.currentUrl];
                    0,
                    this.getSubscription = this.http.get(l).subscribe(function(l) {
                        console.log("CONFIG: Got data: ", l),
                        n.stop(),
                        n.onSuccess(l)
                    }, function(l) {
                        0 == l.status ? console.log("CONFIG: couldn't connect.  ", l) : console.log("CONFIG: error status: " + l),
                        l.transient = !0,
                        n.onFailure(l)
                    })
                } catch (n) {
                    console.log("CONFIG: exception, couldn't connect.  ", n),
                    this.stop(),
                    this.onFailure({
                        status: 0,
                        transient: !0
                    })
                }
                this.currentUrl = (this.currentUrl + 1) % this.urls.length
            }
            ,
            n.prototype.clearPending = function() {
                this.getSubscription && (this.getSubscription.unsubscribe(),
                this.getSubscription = null)
            }
            ,
            n.prototype.stop = function() {
                this.timer && clearInterval(this.timer),
                this.clearPending()
            }
            ,
            n
        }()
          , c = (t(37),
        t(86));
        t(88);
        t.d(l, "a", function() {
            return h
        });
        var d = "069eccfd-5eaf-4b6a-a423-c5eb071a4aac"
          , h = function() {
            function n(n, l, t, e, u, i, o, a, r) {
                this.nav = n,
                this.navParams = l,
                this.platform = t,
                this.blynk = e,
                this.http = u,
                this.appCtrl = i,
                this.w = o,
                this.onboarding = a,
                this.popoverCtrl = r,
                this.networks = [],
                this.httpRobot = new s(u),
                this.device = e.deviceById(this.navParams.get("id")) || e.devices[0],
                this.device || (this.device = {
                    longTitle: function(n) {
                        return "your CoolBot"
                    },
                    firmwareVersion: "7.6.1"
                }),
                this.supportsWebBluetooth = !1
            }
            return n.prototype.ionViewDidLoad = function() {
                this.slides.lockSwipes(!0),
                this.platformNoun = this.platform.is("core") ? "computer" : "device",
                this.probeWebBluetoothAPI()
            }
            ,
            n.prototype.ngAfterViewInit = function() {}
            ,
            n.prototype.ionViewDidEnter = function() {
                this.errorMessage = "",
                this.provisPolicy = "";
                var n = this.getTokenFromUrl();
                n ? (this.enteredViaUrl = !0,
                this.provisPolicy = "API",
                this.deviceToken = n,
                this.device.id = this.getDeviceIdFromUrl(),
                this.gotoSlide(3)) : (this.enteredViaUrl = !1,
                this.deviceToken = void 0,
                this.onboarding.ensureLogin()),
                this.clearNetList(),
                this.protocol = void 0,
                this.slides.lockSwipes(!0)
            }
            ,
            n.prototype.getTokenFromUrl = function() {
                var n = this.platform.url().match(/\?token=([0-9a-f]+)/i);
                if (n && n[1])
                    return n[1]
            }
            ,
            n.prototype.getDeviceIdFromUrl = function() {
                var n = this.platform.url().match(/&id=([0-9]+)/i);
                if (n && n[1])
                    return n[1]
            }
            ,
            n.prototype.gotoSlide = function(n, l) {
                void 0 === l && (l = !0),
                console.log("gotoSlide:", n, "policy:", this.provisPolicy),
                this.slides.lockSwipes(!1),
                l ? this.slides.slideTo(n) : this.slides.slideTo(n, 0),
                this.slides.lockSwipes(!0)
            }
            ,
            n.prototype.nextSlide = function() {
                this.gotoSlide(this.slides.getActiveIndex() + 1)
            }
            ,
            n.prototype.apiUrl = function(n) {
                return "http://192.168.4.1/" + n
            }
            ,
            n.prototype.insecureHost = function() {
                var n = this.platform.url().match(/^https?:\/\/([a-z0-9\.:]+)/i);
                if (n[1]) {
                    if (n[0].startsWith("http:"))
                        return n[1];
                    if (n[1].startsWith("cbtest."))
                        return "cbtestp.storeitcold.com"
                }
                return "cbp.storeitcold.com"
            }
            ,
            n.prototype.getToken = function() {
                var n = this;
                return this.blynk.refreshToken(this.device.id).then(function(l) {
                    return n.deviceToken = l,
                    l
                })
            }
            ,
            n.prototype.setNetListUrl = function() {
                this.netListUrl = "JUMPER" == this.provisPolicy || this.platform.url().startsWith("http://") ? "" : "http://" + this.insecureHost() + "/#/new-device?token=" + this.deviceToken
            }
            ,
            n.prototype.clearNetList = function() {
                this.networks = []
            }
            ,
            n.prototype.showResetInstructions = function(n) {
                this.popoverCtrl.create(r.a).present({
                    ev: n
                })
            }
            ,
            n.prototype.bluetooth = function() {
                var n = window.navigator;
                if (n && n.bluetooth)
                    return n.bluetooth;
                throw new Error("Can't access Bluetooth API.")
            }
            ,
            n.prototype.probeWebBluetoothAPI = function() {
                var n = this;
                try {
                    this.bluetooth().getAvailability().then(function(l) {
                        l ? (n.supportsWebBluetooth = !0,
                        console.log("This device supports Web Bluetooth.")) : console.log("Web Bluetooth is not supported.")
                    })
                } catch (n) {
                    console.log(n)
                }
            }
            ,
            n.prototype.canSupportBluetooth = function() {
                return !this.platform.is("ios") && this.supportsWebBluetooth
            }
            ,
            n.prototype.initBluetooth = function() {
                var n = this
                  , l = {
                    filters: [{
                        services: [d]
                    }, {
                        namePrefix: "CoolBot"
                    }]
                };
                return this.bluetooth().requestDevice(l).then(function(l) {
                    return n.maybeConnectBluetoothDevice(l)
                })
            }
            ,
            n.prototype.maybeConnectBluetoothDevice = function(n) {
                var l = this;
                return void 0 === n && (n = void 0),
                n ? this.bluetoothDevice = n : n = this.bluetoothDevice,
                n && n.gatt && !n.gatt.connected ? (console.log("Connecting to Bluetooth device: " + n.name),
                this.bluetoothDevice.gatt.connect().then(function(n) {
                    return n.getPrimaryService(d)
                }).then(function(n) {
                    return n.getCharacteristic("579ee368-aaee-4f40-8329-8b8341ed0690")
                }).then(function(n) {
                    if (console.log("Bluetooth: setting notification"),
                    l.netListCic = n,
                    !n.properties.notify)
                        throw "Bluetooth: notification not allowed";
                    return n.addEventListener("characteristicvaluechanged", function(n) {
                        return l.newNetListNotification(n)
                    }),
                    n.startNotifications()
                }).then(function() {
                    return console.log("Bluetooth device connected"),
                    !0
                })) : Promise.resolve(!0)
            }
            ,
            n.prototype.newNetListNotification = function(n) {
                console.log("Got Bluetooth net list update notification."),
                this.updateNetListBle(n.target.value)
            }
            ,
            n.prototype.updateNetListBle = function(n) {
                var l = new window.TextDecoder("utf-8").decode(n);
                l && this.gotNetList(l)
            }
            ,
            n.prototype.yearIs2024 = function() {
                this.device.firmwareVersion = "8.0.0",
                this.device.hardwareVersion = "8.0",
                this.doBlePolicyIfSupported()
            }
            ,
            n.prototype.yearIs2023 = function() {
                this.yearIs2022()
            }
            ,
            n.prototype.yearIs2022 = function() {
                this.device.firmwareVersion = "7.7.0",
                this.device.hardwareVersion = "2.01",
                this.doJumperPolicy()
            }
            ,
            n.prototype.yearIsOlder = function() {
                this.device.firmwareVersion = "7.6.1",
                this.device.hardwareVersion = "2.0",
                this.doApiPolicy()
            }
            ,
            n.prototype.checkVersion = function() {
                o.a.satisfies(this.device.firmwareVersion, " >= 8.0.0") && o.a.satisfies(o.a.coerce(this.device.hardwareVersion), " >= 8.0") ? this.doBlePolicyIfSupported() : o.a.satisfies(this.device.firmwareVersion, " >= 7.7.0") ? this.doJumperPolicy() : this.gotoSlide(1)
            }
            ,
            n.prototype.doApiPolicy = function() {
                this.provisPolicy = "API",
                this.resetCoolBot()
            }
            ,
            n.prototype.doJumperPolicy = function(n) {
                void 0 === n && (n = !0),
                this.provisPolicy = "JUMPER",
                n ? this.resetCoolBot() : this.gotoSlide(3)
            }
            ,
            n.prototype.doBlePolicy = function() {
                this.provisPolicy = "BLE",
                this.resetCoolBot()
            }
            ,
            n.prototype.doBlePolicyIfSupported = function() {
                this.canSupportBluetooth() ? this.doBlePolicy() : this.doJumperPolicy()
            }
            ,
            n.prototype.pairBle = function() {
                this.gotoSlide(4)
            }
            ,
            n.prototype.doBlePair = function() {
                var n = this;
                this.initBluetooth().then(function() {
                    return n.getNetList()
                }).catch(function(n) {
                    return console.error("Bluetooth device request error. " + n)
                })
            }
            ,
            n.prototype.resetCoolBot = function() {
                var n = this;
                this.getToken().then(function() {
                    n.setNetListUrl(),
                    n.gotoSlide(2)
                }).catch(function(l) {
                    return n.blynk.showError(l)
                })
            }
            ,
            n.prototype.newPageOpened = function() {
                var n = this;
                return setTimeout(function() {
                    return n.finish()
                }, 1e4),
                !0
            }
            ,
            n.prototype.supportsNetworkRefresh = function() {
                return !this.errorMessage
            }
            ,
            n.prototype.getNetList = function(n) {
                void 0 === n && (n = !0),
                this.gotoSlide(6, n),
                "BLE" == this.provisPolicy ? this.getNetListBle() : this.getNetListWiFi()
            }
            ,
            n.prototype.getNetListWiFi = function(n) {
                var l = this;
                void 0 === n && (n = !0),
                this.httpRobot.get(this.apiUrl("nets"), function(n) {
                    l.gotNetList(n._body)
                }, function(n) {
                    l.errorMessage = "Couldn't get network list.",
                    l.provisPolicy = "CORS",
                    l.networks = [],
                    l.slides.getActiveIndex() < 7 && l.gotoSlide(7)
                })
            }
            ,
            n.prototype.getNetListBle = function() {
                var n = this;
                this.maybeConnectBluetoothDevice().then(function() {
                    var l = new window.TextEncoder("utf-8").encode("rescan");
                    n.netListCic.writeValueWithoutResponse(l)
                }).catch(function(n) {
                    console.log("Bluetooth connection error: ", n)
                })
            }
            ,
            n.prototype.gotNetList = function(n) {
                var l = JSON.parse(n).networks;
                l = u.a.sortBy(l, [function(n) {
                    return -n.rssi
                }
                ]),
                l = u.a.uniqBy(l, function(n) {
                    return n.ssid
                }),
                this.networks = l,
                this.ssid = this.networks[0].ssid,
                console.log("gotNetList(): ", this.networks),
                this.gotoSlide(7)
            }
            ,
            n.prototype.switchToApi = function() {
                this.device.firmwareVersion = "7.6.1",
                this.provisPolicy = "API",
                this.gotoSlide(11)
            }
            ,
            n.prototype.skipNetList = function() {
                this.httpRobot.stop(),
                this.networks = [],
                this.gotoSlide(7)
            }
            ,
            n.prototype.configCoolBot = function() {
                "API" == this.provisPolicy ? (this.gotoSlide(8),
                this.configCoolBotByHttp()) : "BLE" == this.provisPolicy ? (this.gotoSlide(8),
                this.configCoolBotByBle()) : this.introduceFallbackConfig(),
                this.onActivityFinish()
            }
            ,
            n.prototype.configCoolBotByHttp = function() {
                var n = this;
                this.httpRobot.get(this.configUrl() + "&short=1", function(l) {
                    console.log("CONFIG: CoolBot configured."),
                    n.watchErrorCodes()
                }, function(l) {
                    n.errorMessage = "Error when configuring CoolBot: ",
                    n.errorMessage += l.status ? l.statusText : "Couldn't connect.",
                    console.log("CONFIG error: " + n.errorMessage),
                    n.introduceFallbackConfig()
                })
            }
            ,
            n.prototype.configCoolBotByBle = function() {
                var n = this;
                this.bluetoothDevice.gatt.connect().then(function(n) {
                    return n.getPrimaryService(d)
                }).then(function(n) {
                    return n.getCharacteristic("15978154-755d-42cb-92c6-5171f6b3c72f")
                }).then(function(l) {
                    var t = JSON.stringify(n.configBleObject())
                      , e = new window.TextEncoder("utf-8").encode(t);
                    l.writeValueWithResponse(e)
                }).then(function(l) {
                    console.log("Bluetooth: configured device."),
                    n.watchErrorCodes()
                }).catch(function(l) {
                    console.log("Bluetooth config error: ", l),
                    n.introduceFallbackConfig()
                })
            }
            ,
            n.prototype.configInNewTab = function() {
                window.open(this.configUrl(), "_system")
            }
            ,
            n.prototype.configDirectInNewTab = function() {
                window.open(this.directConfigUrl(), "_system"),
                this.onActivityFinish()
            }
            ,
            n.prototype.configBleObject = function() {
                return {
                    blynk: this.deviceToken,
                    host: this.blynk.hardwareHost(),
                    port: this.blynk.hardwareHostPort(),
                    fingerprint: this.blynk.isHardwareSecure() ? this.blynk.serverFingerprint : "",
                    ssid: this.ssid,
                    pass: this.password
                }
            }
            ,
            n.prototype.configUrlParams = function(n) {
                void 0 === n && (n = !0);
                var l = "blynk=" + this.deviceToken;
                return n && (l += "&short=true"),
                l = l + "&host=" + this.blynk.hardwareHost() + "&port=" + this.blynk.hardwareHostPort() + (this.blynk.isHardwareSecure() ? "&fingerprint=" + this.blynk.serverFingerprint : "") + "&ssid=" + encodeURIComponent(this.ssid) + "&pass=" + encodeURIComponent(this.password)
            }
            ,
            n.prototype.configUrl = function(n, l) {
                return void 0 === n && (n = "config"),
                void 0 === l && (l = !0),
                this.apiUrl(n + "?" + this.configUrlParams(l))
            }
            ,
            n.prototype.directConfigUrl = function() {
                return this.configUrl("config_form", !1)
            }
            ,
            n.prototype.doJumperConfig = function() {
                this.gotoSlide(5)
            }
            ,
            n.prototype.introduceFallbackConfig = function() {
                this.gotoSlide(9)
            }
            ,
            n.prototype.watchErrorCodes = function() {
                this.gotoSlide(10)
            }
            ,
            n.prototype.startAgain = function() {
                this.resetCoolBot()
            }
            ,
            n.prototype.onActivityFinish = function() {
                var n = this;
                this.hardwareChange || (this.hardwareChange = this.blynk.hardwareActivity$.subscribe(function(l) {
                    return n.onHardwareChange(l.deviceId, l.active)
                }))
            }
            ,
            n.prototype.onHardwareChange = function(n, l) {
                n == this.device.id && l && this.sayFinished()
            }
            ,
            n.prototype.sayFinished = function() {
                this.gotoSlide(12)
            }
            ,
            n.prototype.finish = function() {
                this.httpRobot.stop(),
                this.enteredViaUrl ? this.w.close() : (this.appCtrl.getRootNavs()[0].setRoot(a.a),
                this.blynk.ensureConnected(),
                this.blynk.setPin(this.device.id, 2, "connect"))
            }
            ,
            n.prototype.updateFirmware = function() {
                this.blynk.setPin(this.device.id, c.f, 1),
                this.finish()
            }
            ,
            n.prototype.ngOnDestroy = function() {
                this.httpRobot.stop(),
                this.hardwareChange && this.hardwareChange.unsubscribe()
            }
            ,
            n
        }()
    },
    86: function(n, l, t) {
        "use strict";
        t.d(l, "b", function() {
            return e
        }),
        t.d(l, "c", function() {
            return u
        }),
        t.d(l, "d", function() {
            return i
        }),
        t.d(l, "a", function() {
            return o
        }),
        t.d(l, "f", function() {
            return a
        }),
        t.d(l, "g", function() {
            return r
        }),
        t.d(l, "h", function() {
            return s
        }),
        t.d(l, "e", function() {
            return c
        });
        var e = 2
          , u = 20
          , i = 35
          , o = 36
          , a = 33
          , r = 18
          , s = 19
          , c = 25
    },
    87: function(n, l, t) {
        "use strict";
        t.d(l, "a", function() {
            return e
        });
        t(3);
        var e = function() {
            return function() {
                this.page_title = ""
            }
        }()
    },
    88: function(n, l, t) {
        "use strict";
        t.d(l, "a", function() {
            return u
        }),
        l.b = function() {
            return window
        }
        ;
        var e = t(3)
          , u = function(n) {
            function l() {
                return null !== n && n.apply(this, arguments) || this
            }
            return Object(e.__extends)(l, n),
            l
        }(Window)
    },
    90: function(n, l, t) {
        "use strict";
        t.d(l, "a", function() {
            return e
        });
        t(3),
        t(13);
        var e = function() {
            function n(n) {
                this.viewCtrl = n
            }
            return n.prototype.ionViewDidLoad = function() {
                console.log("ionViewDidLoad ResetInstructionsPage")
            }
            ,
            n.prototype.close = function() {
                this.viewCtrl.dismiss()
            }
            ,
            n
        }()
    }
}, [430]);
