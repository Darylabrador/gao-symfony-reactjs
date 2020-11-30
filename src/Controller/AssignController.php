<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class AssignController extends AbstractController
{
    /**
     * @Route("/assign", name="assign")
     */
    public function index(): Response
    {
        return $this->render('assign/index.html.twig', [
            'controller_name' => 'AssignController',
        ]);
    }
}
