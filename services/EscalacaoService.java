package br.edu.ifpr.bsi.sistemaclubesoft.services;


import br.edu.ifpr.bsi.sistemaclubesoft.Mapper.EscalacaoMapper;
import br.edu.ifpr.bsi.sistemaclubesoft.model.escalacao.Escalacao;
import br.edu.ifpr.bsi.sistemaclubesoft.model.escalacao.EscalacaoDetailDTO;
import br.edu.ifpr.bsi.sistemaclubesoft.model.escalacao.EscalacaoRequestDTO;
import br.edu.ifpr.bsi.sistemaclubesoft.repositories.EscalacaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class EscalacaoService {

    @Autowired
    private EscalacaoRepository escalacaoRepository;

    @Autowired
    private EscalacaoMapper escalacaoMapper;

    public List<EscalacaoDetailDTO> listar(){
        return escalacaoRepository.findAll()
                .stream()
                .map(escalacaoMapper::entityToDetailDTO)
                .toList();
    }

    public EscalacaoDetailDTO salvar(EscalacaoRequestDTO request){
        Escalacao escalacao = escalacaoMapper.requestDTOToEntity(request);
        return escalacaoMapper.entityToDetailDTO(this.escalacaoRepository.save(escalacao));
    }

    @Transactional
    public EscalacaoDetailDTO atualizar(Long codigo, EscalacaoRequestDTO request){
        this.escalacaoRepository.findById(codigo).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "Escalação não encontrada"));

        Escalacao escalacao = escalacaoMapper.requestDTOToEntity(request);
        escalacao.setCodigo(codigo);
        return escalacaoMapper.entityToDetailDTO(this.escalacaoRepository.save(escalacao));
    }

    @Transactional
    public void excluir(Long codigo){
        Escalacao escalacaoExcluir = this.escalacaoRepository.findById(codigo).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "Escalação não encontrada"));
        escalacaoRepository.delete(escalacaoExcluir);
    }
}
