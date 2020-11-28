<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class OrdinateurController extends AbstractController
{
    /**
     * @Route("/ordinateur", name="ordinateur")
     */
    public function index(): Response
    {
        return $this->render('ordinateur/index.html.twig', [
            'controller_name' => 'OrdinateurController',
        ]);
    }
}
