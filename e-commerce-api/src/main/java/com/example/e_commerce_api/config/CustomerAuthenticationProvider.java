package com.example.e_commerce_api.config;

import com.example.e_commerce_api.entity.user.Account;
import com.example.e_commerce_api.entity.user.User;
import com.example.e_commerce_api.repository.user.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class CustomerAuthenticationProvider implements AuthenticationProvider {
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    AccountRepository accountRepository;


    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String username = authentication.getName();
        String password = authentication.getCredentials().toString();

        Optional<Account> accountList = accountRepository.findByEmail(username);


        if (!accountList.isPresent()) {
            throw new BadCredentialsException("Invalid username or password");
        }

        if(passwordEncoder.matches(password, accountList.get().getPassword())) {
            List<GrantedAuthority> authorities = new ArrayList<>();
            authorities.add(new SimpleGrantedAuthority(accountList.get().getRole().toString()));

            return new UsernamePasswordAuthenticationToken(username, password, authorities);
        }

        else
            throw new BadCredentialsException("Invalid username or password");
    }

    @Override
    public boolean supports(Class<?> authentication){
        return (UsernamePasswordAuthenticationToken.class.isAssignableFrom(authentication));
    }
}
