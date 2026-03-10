package com.bernardo.paymentmanager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.bernardo.paymentmanager.model.Payment;

public interface PaymentRepository extends JpaRepository<Payment, Long> {

    @Query("SELECT SUM(p.valor) FROM Payment p")
    Double calcularTotalDosPagamentos();

}