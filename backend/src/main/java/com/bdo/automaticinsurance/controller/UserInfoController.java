package com.bdo.automaticinsurance.controller;

import com.bdo.automaticinsurance.model.UserInfo;
import com.bdo.automaticinsurance.service.UserInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*") // Angular için açık bırakıyoruz
public class UserInfoController {

    @Autowired
    private UserInfoService userInfoService;

    @PostMapping("/evaluate")
    public UserInfo evaluateUser(@RequestBody UserInfo userInfo) {
        return userInfoService.evaluateCredit(userInfo);
    }
}

