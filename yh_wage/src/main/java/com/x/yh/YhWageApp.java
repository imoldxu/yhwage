package com.x.yh;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@SpringBootApplication
@ComponentScan("com.x.yh.*")
//@EnableAutoConfiguration
@EnableTransactionManagement
@EnableScheduling
public class YhWageApp 
{
    public static void main( String[] args )
    {
        SpringApplication.run(YhWageApp.class, args);
    }
}
