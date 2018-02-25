package com.edu.crm.mybatis.service.impl;
import com.edu.crm.mybatis.dao.UserMapper;
import com.edu.crm.mybatis.pojo.User;
import com.edu.crm.mybatis.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserMapper userMapper;

    @Override
    public User selectById(Long id) {
        return userMapper.selectById(id);
    }

    @Override
    @Transactional
    public void deleteById(Long id) {
        userMapper.deleteById(id);
    }

}