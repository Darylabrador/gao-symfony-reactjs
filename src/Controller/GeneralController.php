<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;


class GeneralController extends AbstractController
{
    /**
     * @Route("/")
     * @Route("/{_any}")
     */
    public function index(): Response
    {
        return $this->render('base.html.twig');
    }
}
