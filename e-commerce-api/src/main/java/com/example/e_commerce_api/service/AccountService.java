package com.example.e_commerce_api.service;

import com.example.e_commerce_api.dto.user.AccountLoginDTO;
import com.example.e_commerce_api.dto.user.AuthenticationDTO;
import com.example.e_commerce_api.entity.user.Account;
import com.example.e_commerce_api.exception.CustomException;
import com.example.e_commerce_api.exception.Error;
import com.example.e_commerce_api.exception.CustomJwtException;
import com.example.e_commerce_api.repository.user.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AccountService {
    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;



    @Autowired
    private OurUserDetailsService ourUserDetailsService;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    public Account updateAccount(Integer id, Account updatedAccount) {
        Optional<Account> optionalAccount = accountRepository.findById(id);
        if (optionalAccount.isPresent()) {
            Account account = optionalAccount.get();

            // Cập nhật thông tin tài khoản
            if (updatedAccount.getUsername() != null && !updatedAccount.getUsername().equals(account.getUsername())) {
                if (usernameExists(updatedAccount.getUsername())) {
                    throw new CustomException(Error.USER_ALREADY_EXISTS);
                }
                account.setEmail(updatedAccount.getUsername());
            }
            if (updatedAccount.getPassword() != null) {
                account.setPassword(passwordEncoder.encode(updatedAccount.getPassword()));
            }
            if (updatedAccount.getLocked() != null) {
                account.setLocked(updatedAccount.getLocked());
            }
            // Cập nhật các thông tin khác nếu có

            return accountRepository.save(account);
        } else {
            throw new CustomException(Error.USER_NOT_FOUND);
        }
    }

    public Account registration(Account account) {

        if (usernameExists(account.getUsername())) {
            throw new CustomException(Error.USER_ALREADY_EXISTS);
        }

//        account.setId(getGenerationId());
        account.setPassword(passwordEncoder.encode(account.getPassword()));
        account.setLocked(account.getLocked());
        return accountRepository.save(account);
    }


    public AuthenticationDTO signIn(AccountLoginDTO account) {


        String name = account.email().trim().toLowerCase();

        if (!usernameExists(name)) {
            throw new CustomJwtException(Error.USER_NOT_FOUND);
        }

        Account accountFind = accountRepository.findByEmail(name).orElseThrow();
        if (!passwordEncoder.matches(account.password(), accountFind.getPassword())) {
            throw new CustomJwtException(Error.USER_FAIL_PASSWORD);
        }
        if (!accountFind.isAccountNonLocked()) {
            throw new CustomJwtException(Error.ACCOUNT_LOCKED);
        }

        // Generate JWT and refresh tokens
        String jwtToken = jwtTokenUtil.generateToken((UserDetails) accountFind);
        String refreshToken = jwtTokenUtil.generateRefreshToken((UserDetails) accountFind);


        return new AuthenticationDTO(jwtToken, refreshToken);
    }
    public Account findById(Integer id){
        return accountRepository.findById(id).orElseThrow();
    }

    public UserDetails generateRefreshToken(String token) {
        if (token == null || token.isEmpty()) {
            throw new CustomJwtException(Error.TOKEN_REQUIRED);
        }

        String username = jwtTokenUtil.extractUsernameToken(token);
        if (username == null || !usernameExists(username)) {
            throw new CustomJwtException(Error.USER_NOT_FOUND_IN_TOKEN);
        }

        return ourUserDetailsService.loadUserByUsername(username);
    }

    private boolean usernameExists(String username) {
        return accountRepository.findByEmail(username).isPresent();
    }

//    public Integer getGenerationId() {
//        UUID uuid = UUID.randomUUID();
//        return (int) (uuid.getMostSignificantBits() & 0xFFFFFFFFL);
//    }
}
