package br.edu.ifpr.bsi.sistemaclubesoft.services;

import br.edu.ifpr.bsi.sistemaclubesoft.model.auth.LoginRequestDTO;
import br.edu.ifpr.bsi.sistemaclubesoft.model.auth.LoginResponseDTO;
import br.edu.ifpr.bsi.sistemaclubesoft.model.tecnico.Tecnico;
import br.edu.ifpr.bsi.sistemaclubesoft.repositories.TecnicoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AuthService {

    @Autowired
    private TecnicoRepository tecnicoRepository;

    public LoginResponseDTO login(LoginRequestDTO request) {
        Tecnico tecnico = tecnicoRepository.findByEmail(request.email())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "E-mail ou senha inválidos"));

        if (!tecnico.getSenha().equals(request.senha())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "E-mail ou senha inválidos");
        }

        return new LoginResponseDTO(
                true,
                "Login realizado com sucesso",
                tecnico.getCodigo(),
                tecnico.getNome(),
                tecnico.getEmail()
        );
    }
}

