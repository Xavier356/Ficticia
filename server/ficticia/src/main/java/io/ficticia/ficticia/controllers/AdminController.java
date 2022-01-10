package io.ficticia.ficticia.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.ficticia.ficticia.models.Admin;
import io.ficticia.ficticia.models.AuthenticationRequest;
import io.ficticia.ficticia.services.AdminService;
import io.ficticia.ficticia.services.FicticiaUserDetailsService;
import io.ficticia.ficticia.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @Autowired
    private FicticiaUserDetailsService fUserDetailsService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @RequestMapping(method = RequestMethod.POST, value = "/authenticate")
    public String createAuthenticationToken(HttpServletRequest httpServletRequest, @RequestBody AuthenticationRequest authenticationRequest) throws Exception {
        String json = "";
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authenticationRequest.getEmail(), authenticationRequest.getPassword())
            );
        } catch (Exception e) {
            throw new Exception("Incorrect username or password", e);
        }

        final Admin userDetails = fUserDetailsService
                .loadUserByUsername(authenticationRequest.getEmail());

        final String jwt = jwtUtil.generateToken(userDetails);

        Map<String,String> response = new HashMap<String,String>();

        DateFormat dateFormat = new SimpleDateFormat("yyyy-mm-dd hh:mm:ss");
        String expire = dateFormat.format(jwtUtil.extractExpiration(jwt));
        response.put("access_token",jwt);
        response.put("token_type","Bearer");
        response.put("expires_at",expire);
        String token_type = "Bearer";
        Date expires_at = jwtUtil.extractExpiration(jwt);

        ObjectMapper mapper = new ObjectMapper();
        try {
            json = mapper.writeValueAsString(response);

        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return json;
    }
}
