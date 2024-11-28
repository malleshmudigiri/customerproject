package com.thacha.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.thacha.demo.model.Customer;
import com.thacha.demo.repository.CustomerJpaRepository;
@Service
public class CustomerService {
	
	private CustomerJpaRepository customerJpaRepository;
	@Autowired
	public CustomerService(CustomerJpaRepository customerJpaRepository) {
		this.customerJpaRepository=customerJpaRepository;
	}

	
	public List<Customer> addCustomers(List<Customer> customers) {
		return customerJpaRepository.saveAll(customers);
	}

	
	public List<Customer> getCustomers() {
		List<Customer> customers=customerJpaRepository.findAll();
		
		return customers;
	}

	public List<Customer> filterCustomers(String customerName, String gender) {
        if (customerName != null && gender != null) {
			
          
            return customerJpaRepository.findByCustomerNameIgnoreCaseAndGenderIgnoreCase(customerName, gender);
        } else if (customerName != null) {
        
            return customerJpaRepository.findByCustomerNameIgnoreCase(customerName);
        } else if (gender != null) {
          
            return customerJpaRepository.findByGender(gender);
        } else {
           
            return customerJpaRepository.findAll();
        }
    }

	


	
	

}
