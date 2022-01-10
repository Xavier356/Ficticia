package io.ficticia.ficticia.services;

import io.ficticia.ficticia.models.User;
import io.ficticia.ficticia.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<User> getAllUsers() {
        List<User> users = new ArrayList<>();
        userRepository.findAll()
                .forEach(users::add);
        return users;
    }

    public User getUser(long id) {
        try {
            var user = userRepository.findById(id);
            return user;
        } catch (Exception e) {
            throw new IllegalArgumentException();
        }
    }

    public void register(User user) {
        userRepository.save(user);
    }

    public void edit(long id, User user){
        userRepository.save(user);
    }

    @Transactional
    public void deleteById(long id){
        userRepository.deleteById(id);
    }

}
