package com.kanban.server.config;

import com.kanban.server.services.JwtUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {
    @Autowired
    private JwtFilter jwtFilter;
    @Autowired
    private JwtUserDetailsService jwtUserDetailsService;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    public AuthenticationProvider userDetailsAuthProvider(){
        DaoAuthenticationProvider a = new DaoAuthenticationProvider();
        a.setUserDetailsService(jwtUserDetailsService);
        a.setPasswordEncoder(passwordEncoder());
        return a;
    }
    @Bean
    public AuthenticationManager authenticationManager( ) throws Exception {
        return new ProviderManager(userDetailsAuthProvider());
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.cors().and().csrf().disable().authorizeHttpRequests()
                .requestMatchers(HttpMethod.POST,"/register","/login","/task/**","/lane/**","/upload","/assignItem")
                .permitAll()
                .requestMatchers(HttpMethod.GET,"/task/**","/getUsers","/lane/**","/getUser/**","/**")
                .permitAll()
                .requestMatchers(HttpMethod.PATCH,"/task/**")
                .permitAll()
                .requestMatchers(HttpMethod.DELETE,"/task/**","/lane/**")
                .permitAll()
                .requestMatchers(HttpMethod.PUT,"/task/**","/lane/**","/updateUser/**")
                .permitAll()
                .requestMatchers(HttpMethod.DELETE,"/task/**","/lane/**")
                .permitAll();
        // Adding our jwt filter before the username password filter
        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
}