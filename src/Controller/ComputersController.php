<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ComputersController extends AbstractController
{
    /**
     * @Route("/api/computers", name="computers", methods="GET")
     */
    public function index(): JsonResponse
    {
        return new JsonResponse(["ordinateur" => 'recuperer les infos']);
    }


    /**
     * @Route("/api/computers/add", name="computers_add", methods="POST")
     */
    public function create(): JsonResponse
    {
        return new JsonResponse(["ordinateur" => 'creer un ordi']);
    }
}
