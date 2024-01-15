package com.kanban.server.config;

import com.kanban.server.models.JwtResponse;
import com.kanban.server.models.user.UserDAO;
import com.kanban.server.models.user.UserDTO;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.Serial;
import java.io.Serializable;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component

public class JwtTokenUtil implements Serializable {
    @Value("${jwt.secret}")
    private String secret;
    @Serial
    private static final long serialVersionUID = -2550185165626007488L;
    public static final long JWT_TOKEN_VALIDITY = 120000;
    //retrieve expiration date from jwt token
    public Date getExpirationDateFromToken(String token) {
        return Jwts.parser().setSigningKey( secret.getBytes()).parseClaimsJws(token).getBody().getExpiration();
    }


    private Boolean isTokenExpired(String token) {
        final Date expiration = getExpirationDateFromToken(token);
        return expiration.before(new Date());
    }
    public String getUsernameFromToken(String token){
        return Jwts.parser().setSigningKey(secret.getBytes()).parseClaimsJws(token).getBody().getSubject();
    }
    public boolean validateToken(String token,String username){
        final String usernameFromToken = getUsernameFromToken(token);
        return (usernameFromToken.equals(username) && !isTokenExpired(token));
    }
    public String generateToken(Map<String,Object> claims, String subject){
        return Jwts.builder().setClaims(claims).setSubject(subject).setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + JWT_TOKEN_VALIDITY * 1000))
                .signWith(SignatureAlgorithm.HS512, secret.getBytes()).compact();
    }


    public JwtResponse getToken(UserDAO userDAO){

        Map<String,Object> claims = new HashMap<>();
        claims.put("id",userDAO.getId());
        return new JwtResponse(generateToken(claims,userDAO.getEmail()));
    }
}