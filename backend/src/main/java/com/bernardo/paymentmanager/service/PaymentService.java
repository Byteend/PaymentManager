package com.bernardo.paymentmanager.service;

import java.util.List;

import org.springframework.stereotype.Service;

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
}