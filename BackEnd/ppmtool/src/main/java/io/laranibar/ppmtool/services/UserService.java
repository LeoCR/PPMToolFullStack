package io.laranibar.ppmtool.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import io.laranibar.ppmtool.domain.User;
import io.laranibar.ppmtool.exceptions.UsernameAlreadyExistsException;
import io.laranibar.ppmtool.repositories.UserRepository;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	public User saveUser(User newUser) {
		try {
			newUser.setPassword(bCryptPasswordEncoder.encode(newUser.getPassword()));
			//Username has to be unique (exception)
			newUser.setUsername(newUser.getUsername());
			//make sure that password and confirmPassword match
			newUser.setConfirmPassword("");
			//we dont persist or show the confirmPassword
			return userRepository.save(newUser);
		} catch (Exception e) {
			throw new UsernameAlreadyExistsException("Username "+ newUser.getUsername()+" already exists.");
		}
	}
	
}
