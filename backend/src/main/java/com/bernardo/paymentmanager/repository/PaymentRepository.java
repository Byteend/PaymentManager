package com.bernardo.paymentmanager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.bernardo.paymentmanager.model.Payment;

public interface PaymentRepository extends JpaRepository<Payment, Long> {

}