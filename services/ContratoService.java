package br.edu.ifpr.bsi.sistemaclubesoft.services;


import br.edu.ifpr.bsi.sistemaclubesoft.Mapper.ContratoMapper;
import br.edu.ifpr.bsi.sistemaclubesoft.model.contrato.Contrato;
import br.edu.ifpr.bsi.sistemaclubesoft.model.contrato.ContratoRequestDTO;
import br.edu.ifpr.bsi.sistemaclubesoft.model.contrato.ContratoResponseDTO;
import br.edu.ifpr.bsi.sistemaclubesoft.repositories.ContratoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class ContratoService {
    @Autowired
    private ContratoRepository contratoRepository;

    @Autowired
    private ContratoMapper contratoMapper;

    public List<ContratoResponseDTO> listar(){
        return contratoRepository.findAll()
                .stream()
                .map(contratoMapper::toDto)
                .toList();
    }

    public ContratoResponseDTO salvar(ContratoRequestDTO request){
        Contrato contrato = contratoMapper.toEntity(request);
        return contratoMapper.toDto(this.contratoRepository.save(contrato));
    }

    @Transactional
    public ContratoResponseDTO atualizar(Long codigo, ContratoRequestDTO request){
        this.contratoRepository.findById(codigo).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "Contrato não encontrado"));

        Contrato contrato = contratoMapper.toEntity(request);
        contrato.setCodigo(codigo);
        return contratoMapper.toDto(this.contratoRepository.save(contrato));
    }

    @Transactional
    public void excluir(Long codigo){
        Contrato contratoExcluir = this.contratoRepository.findById(codigo).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "Contrato não encontrado"));
        contratoRepository.delete(contratoExcluir);
    }
}