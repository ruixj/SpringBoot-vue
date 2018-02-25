package com.edu.crm.config;

import javax.sql.DataSource;

import com.alibaba.druid.pool.DruidDataSource;
import com.alibaba.druid.pool.ExceptionSorter;
import com.alibaba.druid.pool.vendor.MySqlExceptionSorter;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.jdbc.DataSourceBuilder;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import java.sql.SQLException;

@Configuration
@MapperScan(basePackages = { "com.edu.crm.mybatis" },annotationClass=Mapper.class)
@EnableTransactionManagement
public class MybatisConfig {
    @Bean
    public SqlSessionFactory sqlSessionFactory(DataSource dataSource) throws Exception {
        SqlSessionFactoryBean sqlSessionFactoryBean = new SqlSessionFactoryBean();
        sqlSessionFactoryBean.setDataSource(dataSource);
        sqlSessionFactoryBean.setMapperLocations(new PathMatchingResourcePatternResolver().getResources("classpath:mapper/*.xml"));

        return sqlSessionFactoryBean.getObject();
    }


    @Bean(name = "MasterDataSource")
    @ConfigurationProperties(prefix = "spring.datasource.druidone")
    @Primary
    public DataSource testDataSource(/*@Qualifier("exs")ExceptionSorter exceps*/) throws SQLException {
        //return DataSourceBuilder.create().build();
        DruidDataSource ds =  new DruidDataSource();
        ds.setExceptionSorter( "com.alibaba.druid.pool.vendor.MySqlExceptionSorter");
        return ds;
    }

    @Bean
    public PlatformTransactionManager transactionManager(@Qualifier("MasterDataSource")DataSource dataSource) {
        return new DataSourceTransactionManager(dataSource);
    }

}