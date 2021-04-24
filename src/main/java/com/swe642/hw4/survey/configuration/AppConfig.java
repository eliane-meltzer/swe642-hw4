package com.swe642.hw4.survey.configuration;


import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import com.swe642.hw4.survey.data.SurveyData;

import javax.persistence.EntityManagerFactory;
import javax.sql.DataSource;

@Configuration
@EnableJpaRepositories(basePackages = "com.swe642.hw4", entityManagerFactoryRef="entityManagerFactory")
@ComponentScan("com.swe642.hw4")

public class AppConfig {

	@Bean
	@ConfigurationProperties("spring.datasource")
	public DataSource dataSource() {
	    return DataSourceBuilder.create().build();
	}
	@Bean
	public LocalContainerEntityManagerFactoryBean entityManagerFactory(EntityManagerFactoryBuilder builder) {

		return builder
				.dataSource(dataSource())
				.packages(SurveyData.class)
				.persistenceUnit("surveydb")
				.build();
	}

	@Bean
	 public PlatformTransactionManager transactionManager(EntityManagerFactory entityManagerFactory) {
		JpaTransactionManager txManager = new JpaTransactionManager();
	    txManager.setEntityManagerFactory(entityManagerFactory);
	    return txManager;
	 }
}
