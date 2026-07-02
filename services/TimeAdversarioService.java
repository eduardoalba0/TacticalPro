package br.edu.ifpr.bsi.sistemaclubesoft.services;

import br.edu.ifpr.bsi.sistemaclubesoft.Mapper.TimeAdversarioMapper;
import br.edu.ifpr.bsi.sistemaclubesoft.model.timeAdversario.TimeAdversario;
import br.edu.ifpr.bsi.sistemaclubesoft.model.timeAdversario.TimeAdversarioDetailDTO;
import br.edu.ifpr.bsi.sistemaclubesoft.model.timeAdversario.TimeAdversarioRequestDTO;
import br.edu.ifpr.bsi.sistemaclubesoft.repositories.TimeAdversarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class TimeAdversarioService {

    @Autowired
    private TimeAdversarioRepository timeAdversarioRepository;

    @Autowired
    private TimeAdversarioMapper timeAdversarioMapper;

    public List<TimeAdversarioDetailDTO> listar(){
        return timeAdversarioRepository.findAll()
                .stream()
                .map(timeAdversarioMapper::entityToDetailDTO)
                .toList();
    }

    public TimeAdversarioDetailDTO salvar(TimeAdversarioRequestDTO request){
        TimeAdversario timeAdversario = timeAdversarioMapper.requestDTOToEntity(request);
        return timeAdversarioMapper.entityToDetailDTO(this.timeAdversarioRepository.save(timeAdversario));
    }

    @Transactional
    public TimeAdversarioDetailDTO atualizar(Long codigo, TimeAdversarioRequestDTO request){
        this.timeAdversarioRepository.findById(codigo).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "Time Adversario não encontrado"));

        TimeAdversario timeAdversario = timeAdversarioMapper.requestDTOToEntity(request);
        timeAdversario.setCodigo(codigo);
        return timeAdversarioMapper.entityToDetailDTO(this.timeAdversarioRepository.save(timeAdversario));
    }

    @Transactional
    public void excluir(Long codigo){
        TimeAdversario timeAdversarioExcluir = this.timeAdversarioRepository.findById(codigo).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "Time Adversario não encontrado"));
        timeAdversarioRepository.delete(timeAdversarioExcluir);
    }
}
