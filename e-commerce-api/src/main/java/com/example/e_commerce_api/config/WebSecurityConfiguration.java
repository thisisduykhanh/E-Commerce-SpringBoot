package com.example.e_commerce_api.config;

import com.example.e_commerce_api.service.OurUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfigurationSource;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class WebSecurityConfiguration {
    private final OurUserDetailsService ourUserDetailsService;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    @Autowired
    public WebSecurityConfiguration(OurUserDetailsService ourUserDetailsService,
                                    JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.ourUserDetailsService = ourUserDetailsService;
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    /**
     * Cấu hình bảo mật chính
     */

    @Value("${api.prefix}")
    private String apiPrefix;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http,
                                           CorsConfigurationSource corsConfigurationSource) throws Exception {

        http
                // Tắt CSRF (vì sử dụng JWT)
                .csrf(AbstractHttpConfigurer::disable)

                // Cấu hình CORS (cho phép gọi API từ các domain khác nhau)
                .cors(cors -> cors.configurationSource(corsConfigurationSource))

                // Configure truy cập endpoints
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(apiPrefix + "/users/register",
                                apiPrefix + "/users/signin",
                                apiPrefix + "/account/refreshtoken",
                                apiPrefix + "/image",
                                apiPrefix + "/product-group",
                                apiPrefix + "/products/**",
                                apiPrefix + "/product-types",
                                apiPrefix + "/category",
                                apiPrefix + "/supplier/**",
                                apiPrefix + "/accounts/**")
                        .permitAll()
                        .anyRequest().authenticated() // Các API còn lại yêu cầu xác thực
                ).httpBasic(Customizer.withDefaults())

                // Cấu hình session stateless (phù hợp với JWT)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))


                // Add JWT vào chuỗi lọc và ưu tiên loc theo JWT

                .authenticationProvider(authenticationProvider())
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)

                // Tăng cường bảo mật header (ngăn chặn clickjacking, XSS)
                .headers(headers -> headers
                        .frameOptions(HeadersConfigurer.FrameOptionsConfig::disable) // Hỗ trợ H2 Console (nếu có)
                        .contentSecurityPolicy(csp -> csp.policyDirectives("script-src 'self'"))
                );


        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)
            throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();
        daoAuthenticationProvider.setUserDetailsService(ourUserDetailsService);
        daoAuthenticationProvider.setPasswordEncoder(passwordEncoder());
        return daoAuthenticationProvider;
    }

}