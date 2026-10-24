package com.bernardo.paymentmanager.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.bernardo.paymentmanager.model.Payment;
import com.bernardo.paymentmanager.repository.PaymentRepository;

@Service

public class PaymentService {
    
    private final PaymentRepository repository;

    public PaymentService(PaymentRepository repository) {
        this.repository = repository;
    }

    public List<Payment> getAllPayments() {
        return repository.findAll();
    }

    public Payment createPayment(Payment payment) {
        return repository.save(payment);
    }

    public void deletePayment(Long id) {
        repository.deleteById(id);
    }

    public Double calcularTotalDosPagamentos() {
        return repository.calcularTotalDosPagamentos();
    }

    public Payment getPayment(Long id){
        return repository.findById(id).orElse(null);
    }

    public Payment updatePayment(Long id, Payment payment){
        Payment pagamentoExistente = repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Pagamento não encontrado"));

        pagamentoExistente.setTitulo(payment.getTitulo());
        pagamentoExistente.setValor(payment.getValor());
        pagamentoExistente.setData(payment.getData());
        pagamentoExistente.setCategoria(payment.getCategoria());

        return repository.save(pagamentoExistente);
    }
}