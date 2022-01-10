package io.ficticia.ficticia.services;

import io.ficticia.ficticia.repositories.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.security.Principal;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    public String Object (HttpServletRequest httpServletRequest){
        Principal principal = httpServletRequest.getUserPrincipal();
        return principal.getName();
    }
}
