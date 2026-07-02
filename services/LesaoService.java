package br.edu.ifpr.bsi.sistemaclubesoft.services;

import br.edu.ifpr.bsi.sistemaclubesoft.Mapper.LesaoMapper;
import br.edu.ifpr.bsi.sistemaclubesoft.model.lesao.Lesao;
import br.edu.ifpr.bsi.sistemaclubesoft.model.lesao.LesaoRequestDTO;
import br.edu.ifpr.bsi.sistemaclubesoft.model.lesao.LesaoResponseDTO;
import br.edu.ifpr.bsi.sistemaclubesoft.repositories.LesaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class LesaoService {

    @Autowired
    private LesaoRepository lesaoRepository;

    @Autowired
    private LesaoMapper lesaoMapper;

    public List<LesaoResponseDTO> listar(){
        return lesaoRepository.findAll()
                .stream()
                .map(lesaoMapper::entityToResponseDTO)
                .toList();
    }

    public LesaoResponseDTO salvar(LesaoRequestDTO request){
        Lesao lesao = lesaoMapper.requestDTOEntity(request);
        return lesaoMapper.entityToResponseDTO(this.lesaoRepository.save(lesao));
    }

    @Transactional
    public LesaoResponseDTO atualizar(Long codigo, LesaoRequestDTO request){
        this.lesaoRepository.findById(codigo).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "Lesão não encontrada"));

        Lesao lesao = lesaoMapper.requestDTOEntity(request);
        lesao.setCodigo(codigo);
        return lesaoMapper.entityToResponseDTO(this.lesaoRepository.save(lesao));
    }

    @Transactional
    public void excluir(Long codigo){
        Lesao lesaoExcluir = this.lesaoRepository.findById(codigo).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "Lesão não encontrada"));
        lesaoRepository.delete(lesaoExcluir);
    }
}
