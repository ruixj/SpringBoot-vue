package com.edu.crm.mybatis.dao;
import com.edu.crm.mybatis.pojo.User;
import org.apache.ibatis.annotations.Mapper;


@Mapper
public interface UserMapper {
    User selectById(Long id);

    int deleteById(Long id);
}