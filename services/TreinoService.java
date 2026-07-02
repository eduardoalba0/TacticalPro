package br.edu.ifpr.bsi.sistemaclubesoft.services;


import br.edu.ifpr.bsi.sistemaclubesoft.Mapper.TreinoMapper;
import br.edu.ifpr.bsi.sistemaclubesoft.model.treino.Treino;
import br.edu.ifpr.bsi.sistemaclubesoft.model.treino.TreinoDetailDTO;
import br.edu.ifpr.bsi.sistemaclubesoft.model.treino.TreinoRequestDTO;
import br.edu.ifpr.bsi.sistemaclubesoft.repositories.TreinoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class TreinoService {

    @Autowired
    private TreinoRepository treinoRepository;

    @Autowired
    private TreinoMapper treinoMapper;

    public List<TreinoDetailDTO> listar(){
        return treinoRepository.findAll()
                .stream()
                .map(treinoMapper::entityToDetailDTO)
                .toList();
    }

    public TreinoDetailDTO salvar(TreinoRequestDTO request){
        Treino treino = treinoMapper.requestDTOToEntity(request);
        return treinoMapper.entityToDetailDTO(this.treinoRepository.save(treino));
    }

    @Transactional
    public TreinoDetailDTO atualizar(Long codigo, TreinoRequestDTO request){
        this.treinoRepository.findById(codigo).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "Treino não encontrado"));

        Treino treino = treinoMapper.requestDTOToEntity(request);
        treino.setCodigo(codigo);
        return treinoMapper.entityToDetailDTO(this.treinoRepository.save(treino));
    }

    @Transactional
    public void excluir(Long codigo){
        Treino treinoExcluir = this.treinoRepository.findById(codigo).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "Treino não encontrado"));
        treinoRepository.delete(treinoExcluir);
    }
}
