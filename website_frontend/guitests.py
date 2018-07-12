import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys

class GUI_tests(unittest.TestCase) :

	websiteURL = "http://ourplaceholderwebsite.me/"

	def setUp(self) :
		self.driver = webdriver.Firefox()
		self.driver.implicitly_wait(30)		# Sets a sticky timeout to implicitly wait for an element to be found
		self.driver.get(self.websiteURL)


	# Tests the URL and title of homepage
	def test_URL(self) :
		websiteURL = self.websiteURL
		driver = self.driver
		self.assertEqual(websiteURL, driver.current_url)
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

	def test_homepage_links(self) :
		websiteURL = self.websiteURL
		driver = self.driver
		link = driver.find_element_by_link_text('Find Charities Now')
		link.click()
		self.driver.implicitly_wait(30)
		self.assertEqual(websiteURL + "charities", driver.current_url)
		driver.close()

	def test_about_page_links(self) :
		websiteURL = self.websiteURL
		driver = self.driver
		driver.find_element_by_link_text('About').click()
		self.driver.implicitly_wait(30)
		driver.find_element_by_link_text('Postman').click()
		self.driver.implicitly_wait(30)
		self.assertEqual("https://documenter.getpostman.com/view/4692440/RWEmKHEN", driver.current_url)
		driver.close()

if __name__ == "__main__":  # pragma: no cover
	unittest.main()
