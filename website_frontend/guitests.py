import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys

class GUI_tests(unittest.TestCase) :

	websiteURL = "http://knowyourtreatment.com/"

	def setUp(self) :
		self.driver = webdriver.Firefox()
		self.driver.implicitly_wait(30)		# Sets a sticky timeout to implicitly wait for an element to be found
		self.driver.get(self.websiteURL)


	# Tests the URL
	def test_URL(self) :
		websiteURL = self.websiteURL
		driver = self.driver
		self.assertEqual(websiteURL, driver.current_url)
		driver.close()

	# Tests the title of the home page
	def test_title(self) :
		websiteURL = self.websiteURL
		driver = self.driver
		self.assertEqual('Know Your Treatment', driver.title)
		driver.close()


	# Tests the home page button
	def test_home_button(self) :
		websiteURL = self.websiteURL
		driver = self.driver
		driver.find_element_by_link_text('Know Your Treatment').click()
		self.driver.implicitly_wait(30)
		self.assertEqual(websiteURL, driver.current_url)
		driver.close()

	# Tests the links in the navbar
	def test_navbar_links(self) :
		websiteURL = self.websiteURL
		driver = self.driver
		link = driver.find_element_by_link_text('Charities')
		link.click()
		self.assertEqual(websiteURL + "charities", driver.current_url)
		link = driver.find_element_by_link_text('Health Conditions')
		link.click()
		self.driver.implicitly_wait(30)
		self.assertEqual(websiteURL + "healthconditions", driver.current_url)
		link = driver.find_element_by_link_text('Medications')
		link.click()
		self.driver.implicitly_wait(30)
		self.assertEqual(websiteURL + "medications", driver.current_url)
		link = driver.find_element_by_link_text('About')
		link.click()
		self.driver.implicitly_wait(30)
		self.assertEqual(websiteURL + "about", driver.current_url)
		driver.close()

	# Tests the links on the home page
	def test_homepage_links(self) :
		websiteURL = self.websiteURL
		driver = self.driver
		link = driver.find_element_by_link_text('Find charities now')
		link.click()
		self.driver.implicitly_wait(30)
		self.assertEqual(websiteURL + "charities", driver.current_url)
		driver.close()

	# Tests the links on the about page
	def test_about_page_links(self) :
		websiteURL = self.websiteURL
		driver = self.driver
		driver.find_element_by_link_text('About').click()
		self.driver.implicitly_wait(30)
		driver.find_element_by_link_text('Postman').click()
		self.driver.implicitly_wait(30)
		self.assertEqual("https://documenter.getpostman.com/view/4692440/RWMBSAp3", driver.current_url)
		driver.close()

	# Test sample of a link in the charities page
	def test_charities(self) :
		websiteURL = self.websiteURL
		driver = self.driver
		driver.find_element_by_link_text('Charities').click()
		driver.find_element_by_link_text('RABIES IN THE AMERICAS').click()
		driver.find_element_by_link_text('Rabies').click()
		self.assertEqual('http://knowyourtreatment.com/healthconditions/Rabies', driver.current_url)
		driver.close()

	# Test sample of a link in the health conditions page
	def test_health_conditions(self) :
		websiteURl = self.websiteURL
		driver = self.driver
		driver.find_element_by_link_text('Health Conditions').click()
		driver.find_element_by_link_text('Rabies').click()
		driver.find_element_by_link_text('Rabies vaccine').click()
		self.assertEqual('http://knowyourtreatment.com/medications/Rabies%20vaccine', driver.current_url)
		driver.close()

	# Test sample of a link in the medications page
	def test_medications(self) :
		websiteURl = self.websiteURL
		driver = self.driver
		driver.find_element_by_link_text('Medications').click()
		driver.find_element_by_link_text('Rabies vaccine').click()
		driver.find_element_by_link_text('Rabies').click()
		self.assertEqual('http://knowyourtreatment.com/healthconditions/Rabies', driver.current_url)
		driver.close()

if __name__ == "__main__":  # pragma: no cover
	unittest.main()
