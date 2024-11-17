package com.thacha.demo.controller;

import java.io.ByteArrayOutputStream;
import java.util.ArrayList;
import java.util.List;

import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.thacha.demo.model.Customer;
import com.thacha.demo.service.CustomerService;



@CrossOrigin("http://localhost:3000/")
@RestController
@RequestMapping("/api")
public class CustomerController {
	
	private CustomerService customerService;
	@Autowired
	public CustomerController(CustomerService customerService) {
		this.customerService=customerService;
	}
	
	@GetMapping("/customers")
	public List<Customer> getCustomers(){
		return customerService.getCustomers();
	}
	@PostMapping("/savecustomer")
	public List<Customer> addCustomers(@RequestBody List<Customer> customers) {
		return customerService.addCustomers(customers);
	}
   

	@GetMapping("/export/excel")
    public ResponseEntity<byte[]> exportToExcel() {
		List<Customer> customers=customerService.getCustomers();
		ArrayList<Customer> customerList= new ArrayList<>(customers);
        try (Workbook workbook = new XSSFWorkbook()) {
            Sheet sheet = workbook.createSheet("Table Data");
     
            // Sample header row
            Row headerRow = sheet.createRow(0);
            headerRow.createCell(0).setCellValue("CustomerId");
            headerRow.createCell(1).setCellValue("CustomerName");
            headerRow.createCell(2).setCellValue("Gender");
			headerRow.createCell(3).setCellValue("Address");
         
			

			for(int i=0;i<customerList.size();i++) {
				Customer customer= customerList.get(i);
				Row dataRow = sheet.createRow(i+1);
				dataRow.createCell(0).setCellValue(customer.getId());
				dataRow.createCell(1).setCellValue(customer.getCustomerName());
				dataRow.createCell(2).setCellValue(customer.getGender());
				dataRow.createCell(3).setCellValue(customer.getAddress());
				
			}

            // Writing to byte array output stream
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            workbook.write(outputStream);

            // Prepare the HTTP response
            HttpHeaders headers = new HttpHeaders();
            headers.add("Content-Disposition", "attachment; filename=table-data.xlsx");

            return new ResponseEntity<>(outputStream.toByteArray(), headers, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }


	

}
}
