import unittest
from wsgi import is_prime, Invoice

class TestWSGI(unittest.TestCase):
    def test_is_prime(self):
        self.assertFalse(is_prime(0))
        self.assertFalse(is_prime(1))
        self.assertTrue(is_prime(2))
        self.assertTrue(is_prime(3))
        self.assertFalse(is_prime(4))
        self.assertTrue(is_prime(5))
        self.assertFalse(is_prime(9))
        self.assertTrue(is_prime(13))
        self.assertFalse(is_prime(15))
        self.assertTrue(is_prime(17))

    def test_invoice_calculate_total(self):
        invoice = Invoice(amount=100, tax=20)
        self.assertEqual(invoice.calculate_total(), 120)
        invoice2 = Invoice(amount=0, tax=0)
        self.assertEqual(invoice2.calculate_total(), 0)
        invoice3 = Invoice(amount=50.5, tax=9.5)
        self.assertEqual(invoice3.calculate_total(), 60.0)

if __name__ == "__main__":
    unittest.main()
