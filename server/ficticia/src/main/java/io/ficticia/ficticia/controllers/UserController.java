package io.ficticia.ficticia.controllers;

import io.ficticia.ficticia.models.User;
import io.ficticia.ficticia.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin("http://localhost:4200")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/users/{id}")
    public User getUser(@PathVariable long id) {
        return userService.getUser(id);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/users")
    public void addProduct(@ModelAttribute User user) throws IOException {
        userService.register(user);
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/users/{id}")
    public void changeData(@PathVariable long id, @RequestBody User user) {
        User oldUser = userService.getUser(id);
        if (user.getFull_name() == null){
            user.setFull_name(oldUser.getFull_name());
        }
        if (user.getIdentification() == 0){
            user.setIdentification(oldUser.getIdentification());
        }
        if (user.getAge() == 0){
            user.setAge(oldUser.getAge());
        }
        if (user.getGender() == null){
            user.setGender(oldUser.getGender());
        }
        if (user.getState() == null){
            user.setState(oldUser.getState());
        }
        userService.edit(id, user);
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/users/{id}")
    public void deleteUser(@PathVariable long id) {
        userService.deleteById(id);
    }
}