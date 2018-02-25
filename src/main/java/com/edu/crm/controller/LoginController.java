package com.edu.crm.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@RequestMapping("/api")
@RestController
public class LoginController {

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public Map<String, String> login(HttpServletRequest request) throws Exception{

        Map<String, String> map = new HashMap<String, String>();

        map.put("status","1");

        return map;
    }
}