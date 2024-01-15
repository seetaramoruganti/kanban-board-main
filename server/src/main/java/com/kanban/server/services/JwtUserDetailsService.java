package com.kanban.server.services;

import com.kanban.server.models.user.UserDAO;
import com.kanban.server.models.user.UserDTO;
import com.kanban.server.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.ArrayList;
import java.util.List;

@Service
public class JwtUserDetailsService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;
//    @Autowired
//    PasswordEncoder passwordEncoder;

    public UserDAO loadUserByUsername(String username){
        return userRepository.findByEmail(username);
    }
    public UserDTO loadUserById(Long id){
        UserDAO userDAO= userRepository.findById(id).get();
        return UserDTO.builder().id(userDAO.getId()).email(userDAO.getEmail()).name(userDAO.getName()).avatarSrc(userDAO.getAvatarSrc()).build();
    }
    public UserDAO save(UserDAO user){
        UserDAO userDAO=UserDAO.builder().email(user.getEmail()).name(user.getName()).avatarSrc(user.getAvatarSrc()).password(new BCryptPasswordEncoder().encode(user.getPassword())).build();
//        UserDAO savedUser= userRepository.save(user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()))));

        return userRepository.save(userDAO);
    }
    public List<UserDTO> getUsers(){
        List<UserDTO> userDTOS= new ArrayList<>();
        userRepository.findAll().forEach(userDAO ->
                userDTOS.add(UserDTO.builder().id(userDAO.getId()).email(userDAO.getEmail()).name(userDAO.getName()).avatarSrc(userDAO.getAvatarSrc()).build()
                ));
        return userDTOS;
    }
   public UserDTO updateUser(Long id,UserDTO user){
        UserDAO userDAO=userRepository.findById(id).get();
        userDAO.setName(user.getName());
        userDAO.setEmail(user.getEmail());
        userDAO.setAvatarSrc(user.getAvatarSrc());
        userRepository.save(userDAO);
        return UserDTO.builder().id(userDAO.getId()).email(userDAO.getEmail()).name(userDAO.getName()).avatarSrc(userDAO.getAvatarSrc()).build();
   }


}