package io.ficticia.ficticia.services;

import io.ficticia.ficticia.models.Admin;
import io.ficticia.ficticia.repositories.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class FicticiaUserDetailsService implements UserDetailsService {

    @Autowired
    AdminRepository adminRepository;

    @Override
    public Admin loadUserByUsername(String username) throws UsernameNotFoundException{
        return adminRepository.findByUsername(username);
    }
}
