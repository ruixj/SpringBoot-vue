package com.edu.crm.mybatis.service;

import com.edu.crm.mybatis.pojo.User;

public interface UserService {
    User selectById(Long id);

    void deleteById(Long id);
}
