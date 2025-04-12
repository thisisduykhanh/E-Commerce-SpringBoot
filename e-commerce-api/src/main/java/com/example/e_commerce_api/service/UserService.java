package com.example.e_commerce_api.service;

import com.example.e_commerce_api.dto.user.UserCreateDTO;
import com.example.e_commerce_api.dto.user.UserUpdateDTO;
import com.example.e_commerce_api.entity.user.Account;
import com.example.e_commerce_api.entity.user.Role;
import com.example.e_commerce_api.entity.user.User;
import com.example.e_commerce_api.dto.user.UserDTO;
import com.example.e_commerce_api.exception.CustomException;
import com.example.e_commerce_api.exception.Error;
import com.example.e_commerce_api.repository.user.RoleRepository;
import com.example.e_commerce_api.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.Optional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AccountService accountService;
    @Autowired
    private RoleRepository repository;

    @Transactional
    public User createUser(UserCreateDTO userCreateDTO) {
        User user = new User();
//        user.setId(getGenerationId());
        user.setFullName(userCreateDTO.fullName());
        user.setPhone(userCreateDTO.phone());
        Role role=repository.findByRole("user").orElseThrow();
        Account account= Account.builder().role(role).email(userCreateDTO.email()).password(userCreateDTO.password()).locked(false).build();
        Account accountSave=accountService.registration(account);
        user.setAccount(accountSave);
        return userRepository.save(user);
    }

    @Transactional
    public User updateUser(Long id, UserUpdateDTO userUpdateDTO) {
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setFullName(userUpdateDTO.fullName());
            user.setPhone(userUpdateDTO.phone());

            Account account= Account.builder().email(userUpdateDTO.email()).password(userUpdateDTO.password()).locked(userUpdateDTO.locked()).build();
            Account accountUpdate=accountService.updateAccount(user.getAccount().getId(),account);

            return userRepository.save(user);
        } else {
            throw new CustomException(Error.USER_NOT_FOUND);
        }
    }

    @Transactional
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }


    @Transactional(readOnly = true)
    public Page<User> findAllUsers(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return userRepository.findAll(pageable);
    }

    @Transactional(readOnly = true)
    public User findUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new CustomException(Error.USER_NOT_FOUND));
    }

    @Transactional
    public User findUserByAccount(Account account) {
        return userRepository.findByAccount(account);
    }
//    public Integer getGenerationId() {
//        UUID uuid = UUID.randomUUID();
//        return (int) (uuid.getMostSignificantBits() & 0xFFFFFFFFL);
//    }
}
