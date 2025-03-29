package com.example.e_commerce_api.service;

import com.example.e_commerce_api.entity.user.Role;
import com.example.e_commerce_api.repository.user.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class RoleService  {
    @Autowired
    private RoleRepository roleRepository;

    public Role createRole(Role role) {
        role.setId(getGenerationId());
        return roleRepository.save(role);
    }


    public Role UpdateRole(Role role) {
        Role roleFind=findById(role.getId());

        return roleRepository.save(role);
    }


    public Role findById(Integer id) {
        return roleRepository.findById(id).orElseThrow();
    }


    public Role findByName(String name) {
        return roleRepository.findByRole(name).orElseThrow();
    }

    public Integer getGenerationId() {
        UUID uuid = UUID.randomUUID();
        // Use most significant bits and ensure it's within the integer range
        return (int) (uuid.getMostSignificantBits() & 0xFFFFFFFFL);
    }
}
